import { calculate_repo_contribution } from './handler/calculateRepoContributionHandler.js'
import { calculate_repo_importance } from './handler/calculateRepoImportanceHandler.js'
import { calculate_repo_value } from './handler/calculateRepoValueHandler.js'

const get_repo_criteria_info = (repo_info) => {
    const weekly_commit_activity = 0
    const year_commit_activity = 0

    return weekly_commit_activity, year_commit_activity
}

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
            name: repo.name,
            full_name: repo.full_name,
            private: repo.private,
            html_url: repo.html_url,
            description: repo.description,
            forks_url: repo.forks_url,
            stars: repo.stargazers_count,
            forks: repo.forks,
            watchs: repo.watchers,
        }
    })

    return repo_list
}

const get_repo_value = async (repo_list) => {
    const new_repo_list = []
    for (const repo_info of repo_list) {
        const { weekly_commit_activity, year_commit_activity } = get_repo_criteria_info(repo_info)
        const repo_importance = calculate_repo_importance(repo_info.stars, repo_info.forks, repo_info.watchs, weekly_commit_activity, year_commit_activity)
        const repo_contribution = calculate_repo_contribution()
        const repo_value = calculate_repo_value(repo_importance, repo_contribution)

        new_repo_list.push({
            ...repo_info,
            repo_value,
        })
    }

    return new_repo_list
}

export const get_talent_value = async (repo_url) => {
    let repo_list = await get_repo_list(repo_url)
    repo_list = await get_repo_value(repo_list)

    let talent_value = 0
    for (const repo_info of repo_list) {
        talent_value += repo_info.repo_value
    }

    return talent_value
}
