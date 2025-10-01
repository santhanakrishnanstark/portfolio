# 🚀 GitHub Integrations Quick Start Guide

Get your portfolio connected to GitHub in 30 minutes with these high-impact integrations.

## 🎯 Quick Wins (30 minutes)

### 1. GitHub Personal Access Token Setup (5 minutes)

1. Go to GitHub → Settings → Developer settings → Personal access tokens
2. Generate new token with these scopes:
   ```
   ✅ public_repo
   ✅ read:user
   ✅ read:org
   ✅ user:email
   ```
3. Add to your environment variables:
   ```env
   GITHUB_TOKEN=your_token_here
   NEXT_PUBLIC_GITHUB_USERNAME=santhanakrishnanstark
   ```

### 2. Dynamic GitHub Stats Component (15 minutes)

Create `components/GitHubStats.js`:
```javascript
import { useState, useEffect } from 'react';

export default function GitHubStats() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchGitHubStats();
  }, []);

  const fetchGitHubStats = async () => {
    try {
      const username = process.env.NEXT_PUBLIC_GITHUB_USERNAME;
      
      // Fetch user data
      const userResponse = await fetch(`https://api.github.com/users/${username}`);
      const userData = await userResponse.json();
      
      // Fetch repositories
      const reposResponse = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=100`);
      const reposData = await reposResponse.json();
      
      // Calculate stats
      const totalStars = reposData.reduce((sum, repo) => sum + repo.stargazers_count, 0);
      const totalForks = reposData.reduce((sum, repo) => sum + repo.forks_count, 0);
      const languages = {};
      
      reposData.forEach(repo => {
        if (repo.language) {
          languages[repo.language] = (languages[repo.language] || 0) + 1;
        }
      });

      setStats({
        followers: userData.followers,
        following: userData.following,
        publicRepos: userData.public_repos,
        totalStars,
        totalForks,
        topLanguages: Object.entries(languages)
          .sort(([,a], [,b]) => b - a)
          .slice(0, 5)
      });
    } catch (error) {
      console.error('Error fetching GitHub stats:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="animate-pulse">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="bg-gray-200 h-20 rounded-lg"></div>
          ))}
        </div>
      </div>
    );
  }

  if (!stats) return null;

  return (
    <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
      <h3 className="text-xl font-bold mb-4 text-white">GitHub Statistics</h3>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <StatCard label="Repositories" value={stats.publicRepos} />
        <StatCard label="Stars Earned" value={stats.totalStars} />
        <StatCard label="Followers" value={stats.followers} />
        <StatCard label="Following" value={stats.following} />
      </div>

      <div>
        <h4 className="text-lg font-semibold mb-3 text-white">Top Languages</h4>
        <div className="flex flex-wrap gap-2">
          {stats.topLanguages.map(([language, count]) => (
            <span
              key={language}
              className="px-3 py-1 bg-blue-500/20 text-blue-300 rounded-full text-sm"
            >
              {language} ({count})
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

function StatCard({ label, value }) {
  return (
    <div className="text-center">
      <div className="text-2xl font-bold text-white">{value.toLocaleString()}</div>
      <div className="text-sm text-gray-300">{label}</div>
    </div>
  );
}
```

### 3. Featured Repositories Component (10 minutes)

Create `components/GitHubRepos.js`:
```javascript
import { useState, useEffect } from 'react';
import { FiStar, FiGitBranch, FiExternalLink } from 'react-icons/fi';

export default function GitHubRepos() {
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFeaturedRepos();
  }, []);

  const fetchFeaturedRepos = async () => {
    try {
      const username = process.env.NEXT_PUBLIC_GITHUB_USERNAME;
      const response = await fetch(
        `https://api.github.com/users/${username}/repos?sort=stars&per_page=6`
      );
      const data = await response.json();
      
      // Filter out forks and select top repositories
      const featuredRepos = data
        .filter(repo => !repo.fork)
        .slice(0, 6);
      
      setRepos(featuredRepos);
    } catch (error) {
      console.error('Error fetching repositories:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="animate-pulse bg-gray-200 h-48 rounded-lg"></div>
        ))}
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
  return (
    <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20 hover:bg-white/20 transition-all duration-300">
      <div className="flex justify-between items-start mb-3">
        <h3 className="text-lg font-semibold text-white truncate">{repo.name}</h3>
        <a
          href={repo.html_url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-400 hover:text-blue-300"
        >
          <FiExternalLink size={18} />
        </a>
      </div>
      
      <p className="text-gray-300 text-sm mb-4 line-clamp-3">
        {repo.description || 'No description available'}
      </p>
      
      <div className="flex items-center justify-between text-sm text-gray-400">
        <div className="flex items-center space-x-4">
          {repo.language && (
            <span className="flex items-center">
              <span className="w-3 h-3 rounded-full bg-blue-500 mr-1"></span>
              {repo.language}
            </span>
          )}
          <span className="flex items-center">
            <FiStar className="mr-1" size={14} />
            {repo.stargazers_count}
          </span>
          <span className="flex items-center">
            <FiGitBranch className="mr-1" size={14} />
            {repo.forks_count}
          </span>
        </div>
      </div>
    </div>
  );
}
```

## 🔧 Integration Steps

### Step 1: Install Dependencies
```bash
npm install @octokit/rest date-fns
```

### Step 2: Add Components to Homepage
Update `pages/index.js`:
```javascript
import GitHubStats from '../components/GitHubStats';
import GitHubRepos from '../components/GitHubRepos';

// Add these sections to your homepage
<section className="py-20">
  <div className="container mx-auto px-6">
    <h2 className="text-3xl font-bold text-center mb-12">GitHub Activity</h2>
    <GitHubStats />
  </div>
</section>

<section className="py-20">
  <div className="container mx-auto px-6">
    <h2 className="text-3xl font-bold text-center mb-12">Featured Repositories</h2>
    <GitHubRepos />
  </div>
</section>
```

### Step 3: Environment Variables
Create `.env.local`:
```env
GITHUB_TOKEN=your_github_token
NEXT_PUBLIC_GITHUB_USERNAME=santhanakrishnanstark
```

## 🚀 Advanced Features (Optional)

### GitHub Contribution Calendar
```bash
npm install react-github-calendar
```

```javascript
import GitHubCalendar from 'react-github-calendar';

<GitHubCalendar 
  username="santhanakrishnanstark"
  blockSize={15}
  blockMargin={5}
  color="#c084f5"
  fontSize={16}
/>
```

### Real-time Activity Feed
```javascript
// Fetch recent GitHub activity
const activity = await fetch(`https://api.github.com/users/${username}/events/public`);
```

## 📊 Expected Results

After implementing these quick integrations:

✅ **Dynamic GitHub Stats** - Live follower count, repository stats, star count
✅ **Featured Repositories** - Automatically showcase your best projects  
✅ **Real-time Updates** - Data refreshes automatically
✅ **Professional Appearance** - Modern, responsive design
✅ **Zero Maintenance** - Updates automatically from GitHub

## 🎯 Next Steps

1. **Deploy and Test** - Push changes and verify GitHub data loads
2. **Add Contribution Calendar** - Visual representation of coding activity
3. **Implement Caching** - Cache GitHub API responses for better performance
4. **Add Error Handling** - Graceful fallbacks when GitHub API is unavailable
5. **Monitor API Limits** - Track GitHub API usage and implement rate limiting

## 🔗 Useful Resources

- [GitHub REST API Documentation](https://docs.github.com/en/rest)
- [GitHub Personal Access Tokens](https://github.com/settings/tokens)
- [Octokit.js Documentation](https://octokit.github.io/rest.js/)
- [React GitHub Calendar](https://github.com/grubersjoe/react-github-calendar)

Ready to make your portfolio dynamic with live GitHub data? Start with the GitHub stats component and see your portfolio come alive!