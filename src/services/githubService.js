const GITHUB_API_URL = 'https://api.github.com/users/ajit421/repos';
const CACHE_KEY = 'github_repos_cache';
const CACHE_DURATION = 1000 * 60 * 30; // 30 minutes

export async function fetchGitHubRepos() {
    try {
        // Check cache first
        const cached = getCachedData();
        if (cached) {
            console.log('Using cached GitHub data');
            return cached;
        }

        // Fetch from API
        const response = await fetch(GITHUB_API_URL, {
            headers: {
                'Accept': 'application/vnd.github.v3+json'
            }
        });

        if (!response.ok) {
            if (response.status === 403) {
                throw new Error('GitHub API rate limit exceeded');
            }
            throw new Error(`GitHub API error: ${response.status}`);
        }

        const repos = await response.json();

        // Transform and cache
        const transformed = repos.map(repo => ({
            id: repo.id,
            name: repo.name,
            description: repo.description || 'No description available',
            html_url: repo.html_url,
            homepage: repo.homepage,
            language: repo.language,
            stargazers_count: repo.stargazers_count,
            forks_count: repo.forks_count,
            updated_at: repo.updated_at,
            topics: repo.topics || []
        }));

        setCachedData(transformed);
        return transformed;
    } catch (error) {
        console.error('GitHub API fetch failed:', error);
        throw error;
    }
}

function getCachedData() {
    try {
        const cached = localStorage.getItem(CACHE_KEY);
        if (!cached) return null;

        const { data, timestamp } = JSON.parse(cached);
        const now = Date.now();

        if (now - timestamp > CACHE_DURATION) {
            localStorage.removeItem(CACHE_KEY);
            return null;
        }

        return data;
    } catch {
        return null;
    }
}

function setCachedData(data) {
    try {
        localStorage.setItem(CACHE_KEY, JSON.stringify({
            data,
            timestamp: Date.now()
        }));
    } catch (error) {
        console.warn('Failed to cache data:', error);
    }
}
