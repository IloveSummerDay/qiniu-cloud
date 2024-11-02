const get_repo_list = async (repo_url) => {
    let repo_list = await fetch(repo_url)
        .then((res) => {
            return res.json()
        })
        .then((data) => {
            return data
        })
        .catch((error) => {})

    repo_list = repo_list.map((repo, i) => {
        return {
            owner: repo.owner.login,
            repo_name: repo.name,
            repo_full_name: repo.full_name,
            private: repo.private,
            html_url: repo.html_url,
            description: repo.description,
            forks_url: repo.forks_url,
            stars: repo.stargazers_count,
            forks: repo.forks,
            watchs: repo.watchers,
            fork: repo.fork,
            public_repos: repo.public_repos,
        }
    })

    return repo_list
}

const get_repo_importance_value = async (repo_list) => {
    const repo_importance_value = 0

    let stars = 0
    let forks = 0
    let watchs = 0
    for (const repo of repo_list) {
        if (repo.fork == false) {
        }
    }

    // ...
    return repo_importance_value
}

const get_repo_contribution_value = async (repo_list) => {
    const repo_contribution_value = 0

    let prs = 0
    let close_prs = 0
    let merged_prs = 0
    for (const repo of repo_list) {
        if (repo.fork == true) {
        }
    }
    // ...
    return repo_contribution_value
}

export const get_talent_value = async (repo_url, followers) => {
    const repo_list = await get_repo_list(repo_url)

    const repo_importance_value = await get_repo_importance_value(repo_list)
    const repo_contribution_value = await get_repo_contribution_value(repo_list)

    const weight_followers = 0.6
    const talent_value = weight_followers * followers + repo_importance_value + repo_contribution_value
    
    return talent_value
}
