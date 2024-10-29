export const rest_api_url_map = {
    // repo
    repo_summary: 'GET /repos/{owner}/{repo}',
    stars: 'GET /repos/{owner}/{repo}/stargazers',
    forks: 'GET /repos/{owner}/{repo}/forks',
    subscribers: 'GET /repos/{owner}/{repo}/subscribers',
    pulls: 'GET /repos/{owner}/{repo}/pulls',
    languages: 'GET /repos/{owner}/{repo}/languages',
    contributors: 'GET /repos/{owner}/{repo}/contributors',
    topics: 'GET /repos/{owner}/{repo}/topics',
    commits: 'GET /repos/{owner}/{repo}/commits',

    // user
    search_users: 'GET /search/{username}',
    username_users: 'GET /users/{username}',
    username_followers: 'GET /users/{username}/followers',
    username_following: 'GET /users/{username}/following',
    social_accounts: 'GET /users/{username}/social_accounts',
}
