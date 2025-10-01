import { useState, useEffect } from 'react';

export default function GitHubStats() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchGitHubStats();
  }, []);

  const fetchGitHubStats = async () => {
    try {
      const username = 'santhanakrishnanstark';
      
      // Input validation
      if (!username || !/^[a-zA-Z0-9-]+$/.test(username)) {
        throw new Error('Invalid username format');
      }
      
      // Secure API call with proper headers
      const apiHeaders = {
        'Accept': 'application/vnd.github.v3+json',
        'User-Agent': 'Portfolio-App/1.0'
      };
      
      // Fetch user data with timeout
      const userController = new AbortController();
      const userTimeout = setTimeout(() => userController.abort(), 10000); // 10s timeout
      
      const userResponse = await fetch(`https://api.github.com/users/${username}`, {
        headers: apiHeaders,
        signal: userController.signal
      });
      clearTimeout(userTimeout);
      
      if (!userResponse.ok) {
        throw new Error(`GitHub API error: ${userResponse.status}`);
      }
      const userData = await userResponse.json();
      
      // Validate response data
      if (!userData || typeof userData !== 'object') {
        throw new Error('Invalid user data received');
      }
      
      // Fetch repositories with timeout
      const reposController = new AbortController();
      const reposTimeout = setTimeout(() => reposController.abort(), 10000); // 10s timeout
      
      const reposResponse = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=100`, {
        headers: apiHeaders,
        signal: reposController.signal
      });
      clearTimeout(reposTimeout);
      
      if (!reposResponse.ok) {
        throw new Error(`GitHub API error: ${reposResponse.status}`);
      }
      const reposData = await reposResponse.json();
      
      // Validate repositories data
      if (!Array.isArray(reposData)) {
        throw new Error('Invalid repositories data received');
      }
      
      // Calculate stats with safe data handling
      const totalStars = reposData.reduce((sum, repo) => {
        return sum + (typeof repo.stargazers_count === 'number' ? repo.stargazers_count : 0);
      }, 0);
      
      const totalForks = reposData.reduce((sum, repo) => {
        return sum + (typeof repo.forks_count === 'number' ? repo.forks_count : 0);
      }, 0);
      
      const languages = {};
      reposData.forEach(repo => {
        if (repo.language && typeof repo.language === 'string') {
          // Sanitize language name
          const safeLang = repo.language.replace(/[<>]/g, '');
          languages[safeLang] = (languages[safeLang] || 0) + 1;
        }
      });

      // Sanitize and validate final data
      const sanitizedStats = {
        followers: typeof userData.followers === 'number' ? userData.followers : 0,
        following: typeof userData.following === 'number' ? userData.following : 0,
        publicRepos: typeof userData.public_repos === 'number' ? userData.public_repos : 0,
        totalStars: Math.max(0, totalStars),
        totalForks: Math.max(0, totalForks),
        topLanguages: Object.entries(languages)
          .sort(([,a], [,b]) => b - a)
          .slice(0, 5)
          .filter(([lang]) => lang.length > 0 && lang.length < 50) // Reasonable limits
      };

      setStats(sanitizedStats);
    } catch (error) {
      // Safe error logging (no sensitive data)
      const safeError = error.name === 'AbortError' ? 'Request timeout' : 'Failed to load GitHub data';
      console.error('GitHub Stats Error:', {
        message: error.message,
        timestamp: new Date().toISOString(),
        component: 'GitHubStats'
      });
      setError(safeError);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="animate-pulse">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="bg-gray-100 rounded-xl p-6 border border-gray-200">
              <div className="h-8 bg-gray-200 rounded mb-2"></div>
              <div className="h-4 bg-gray-200 rounded"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 rounded-xl p-6 border border-red-200">
        <p className="text-red-600">Failed to load GitHub stats: {error}</p>
        <button
          onClick={fetchGitHubStats}
          className="mt-2 px-4 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors"
        >
          Retry
        </button>
      </div>
    );
  }

  if (!stats) return null;

  return (
    <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-6 border border-gray-200 shadow-lg">
      <h3 className="text-xl font-bold mb-6 text-gray-900 flex items-center">
        <svg className="w-6 h-6 mr-2 text-gray-700" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
        </svg>
        GitHub Statistics
      </h3>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <StatCard label="Repositories" value={stats.publicRepos} icon="📁" />
        <StatCard label="Stars Earned" value={stats.totalStars} icon="⭐" />
        <StatCard label="Followers" value={stats.followers} icon="👥" />
        <StatCard label="Following" value={stats.following} icon="👤" />
      </div>

      {stats.topLanguages.length > 0 && (
        <div>
          <h4 className="text-lg font-semibold mb-3 text-gray-900">Top Languages</h4>
          <div className="flex flex-wrap gap-2">
            {stats.topLanguages.map(([language, count]) => (
              <span
                key={language}
                className="px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-sm border border-primary-200 hover:bg-primary-200 transition-colors"
              >
                {language} ({count})
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function StatCard({ label, value, icon }) {
  return (
    <div className="text-center bg-white rounded-lg p-4 border border-gray-200 hover:bg-gray-50 hover:shadow-md transition-all duration-300">
      <div className="text-2xl mb-1">{icon}</div>
      <div className="text-2xl font-bold text-gray-900">{value.toLocaleString()}</div>
      <div className="text-sm text-gray-600">{label}</div>
    </div>
  );
}