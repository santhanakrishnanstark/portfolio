import { useState, useEffect } from 'react';
import { FiStar, FiGitBranch, FiExternalLink, FiEye } from 'react-icons/fi';

export default function GitHubRepos() {
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchFeaturedRepos();
  }, []);

  const fetchFeaturedRepos = async () => {
    try {
      const username = 'santhanakrishnanstark';
      
      // Input validation
      if (!username || !/^[a-zA-Z0-9-]+$/.test(username)) {
        throw new Error('Invalid username format');
      }
      
      // Secure API call with proper headers and timeout
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 15000); // 15s timeout for repos
      
      const response = await fetch(
        `https://api.github.com/users/${username}/repos?sort=stars&per_page=100`,
        {
          headers: {
            'Accept': 'application/vnd.github.v3+json',
            'User-Agent': 'Portfolio-App/1.0'
          },
          signal: controller.signal
        }
      );
      clearTimeout(timeout);
      
      if (!response.ok) {
        throw new Error(`GitHub API error: ${response.status}`);
      }
      
      const data = await response.json();
      
      // Validate response data
      if (!Array.isArray(data)) {
        throw new Error('Invalid repositories data received');
      }
      
      // Filter and sanitize repositories data
      const featuredRepos = data
        .filter(repo => {
          // Security: Validate repo object structure
          return repo &&
                 typeof repo === 'object' &&
                 !repo.fork &&
                 typeof repo.name === 'string' &&
                 typeof repo.html_url === 'string' &&
                 repo.html_url.startsWith('https://github.com/');
        })
        .map(repo => ({
          // Sanitize repository data
          id: repo.id,
          name: repo.name.replace(/[<>]/g, ''), // Remove potential XSS chars
          description: repo.description ? repo.description.slice(0, 200).replace(/[<>]/g, '') : null,
          html_url: repo.html_url,
          stargazers_count: typeof repo.stargazers_count === 'number' ? Math.max(0, repo.stargazers_count) : 0,
          forks_count: typeof repo.forks_count === 'number' ? Math.max(0, repo.forks_count) : 0,
          language: repo.language && typeof repo.language === 'string' ? repo.language.replace(/[<>]/g, '') : null,
          updated_at: repo.updated_at,
          topics: Array.isArray(repo.topics) ?
            repo.topics
              .filter(topic => typeof topic === 'string' && topic.length > 0 && topic.length < 50)
              .slice(0, 10) // Limit topics
              .map(topic => topic.replace(/[<>]/g, '')) : []
        }))
        .sort((a, b) => {
          // Sort by stars first, then by recent activity
          if (b.stargazers_count !== a.stargazers_count) {
            return b.stargazers_count - a.stargazers_count;
          }
          return new Date(b.updated_at) - new Date(a.updated_at);
        })
        .slice(0, 6);
      
      setRepos(featuredRepos);
    } catch (error) {
      // Safe error logging (no sensitive data)
      const safeError = error.name === 'AbortError' ? 'Request timeout' : 'Failed to load repositories';
      console.error('GitHub Repos Error:', {
        message: error.message,
        timestamp: new Date().toISOString(),
        component: 'GitHubRepos'
      });
      setError(safeError);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="animate-pulse bg-gray-100 rounded-xl p-6 border border-gray-200">
            <div className="h-6 bg-gray-200 rounded mb-3"></div>
            <div className="h-4 bg-gray-200 rounded mb-2"></div>
            <div className="h-4 bg-gray-200 rounded mb-4 w-3/4"></div>
            <div className="flex justify-between">
              <div className="h-4 bg-gray-200 rounded w-20"></div>
              <div className="h-4 bg-gray-200 rounded w-16"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 rounded-xl p-6 border border-red-200">
        <p className="text-red-600">Failed to load repositories: {error}</p>
        <button
          onClick={fetchFeaturedRepos}
          className="mt-2 px-4 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors"
        >
          Retry
        </button>
      </div>
    );
  }

  if (repos.length === 0) {
    return (
      <div className="bg-gray-100 rounded-xl p-6 border border-gray-200 text-center">
        <p className="text-gray-600">No repositories found</p>
      </div>
    );
  }

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {repos.map(repo => (
        <RepoCard key={repo.id} repo={repo} />
      ))}
    </div>
  );
}

function RepoCard({ repo }) {
  const getLanguageColor = (language) => {
    const colors = {
      JavaScript: '#f1e05a',
      TypeScript: '#2b7489',
      Python: '#3572A5',
      Java: '#b07219',
      'C++': '#f34b7d',
      C: '#555555',
      PHP: '#4F5D95',
      Ruby: '#701516',
      Go: '#00ADD8',
      Rust: '#dea584',
      Swift: '#ffac45',
      Kotlin: '#F18E33',
      Dart: '#00B4AB',
      HTML: '#e34c26',
      CSS: '#1572B6',
      Vue: '#2c3e50',
      React: '#61dafb',
    };
    return colors[language] || '#8b949e';
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 1) return 'Updated yesterday';
    if (diffDays < 7) return `Updated ${diffDays} days ago`;
    if (diffDays < 30) return `Updated ${Math.ceil(diffDays / 7)} weeks ago`;
    if (diffDays < 365) return `Updated ${Math.ceil(diffDays / 30)} months ago`;
    return `Updated ${Math.ceil(diffDays / 365)} years ago`;
  };

  return (
    <div className="bg-white rounded-xl p-6 border border-gray-200 hover:shadow-lg hover:border-gray-300 transition-all duration-300 group">
      <div className="flex justify-between items-start mb-3">
        <h3 className="text-lg font-semibold text-gray-900 truncate pr-2 group-hover:text-primary-600 transition-colors">
          {repo.name}
        </h3>
        <a
          href={repo.html_url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-primary-600 hover:text-primary-700 transition-colors flex-shrink-0"
          title="View on GitHub"
        >
          <FiExternalLink size={18} />
        </a>
      </div>
      
      <p className="text-gray-600 text-sm mb-4 line-clamp-3 leading-relaxed">
        {repo.description || 'No description available'}
      </p>
      
      <div className="flex items-center justify-between text-sm text-gray-500 mb-3">
        <div className="flex items-center space-x-4">
          {repo.language && (
            <span className="flex items-center">
              <span
                className="w-3 h-3 rounded-full mr-1"
                style={{ backgroundColor: getLanguageColor(repo.language) }}
              ></span>
              <span className="text-gray-700">{repo.language}</span>
            </span>
          )}
          <span className="flex items-center text-gray-600">
            <FiStar className="mr-1" size={14} />
            {repo.stargazers_count}
          </span>
          <span className="flex items-center text-gray-600">
            <FiGitBranch className="mr-1" size={14} />
            {repo.forks_count}
          </span>
        </div>
      </div>

      <div className="text-xs text-gray-500">
        {formatDate(repo.updated_at)}
      </div>

      {repo.topics && repo.topics.length > 0 && (
        <div className="mt-3 flex flex-wrap gap-1">
          {repo.topics.slice(0, 3).map(topic => (
            <span
              key={topic}
              className="px-2 py-1 bg-primary-100 text-primary-700 rounded text-xs border border-primary-200"
            >
              {topic}
            </span>
          ))}
          {repo.topics.length > 3 && (
            <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs border border-gray-200">
              +{repo.topics.length - 3}
            </span>
          )}
        </div>
      )}
    </div>
  );
}