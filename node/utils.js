import { calculateRepoContribution } from './handlers/calculateContriRatioHandler.js'
import { calculateRepoImportance } from './handlers/calculateRepoImportanceHandler.js'
import { calculateRepoValue } from './handlers/calculateRepoValueHandler.js'
import { RawDataGetter } from './handlers/RawDataGetter.js'

const get_repo_criteria_info = async (repo_info) => {
    const merged_prs = 0

    const raw_data_getter = new RawDataGetter({})
    const pulls_args = { state: 'all' }
    let pr_data = await raw_data_getter.getRepoBasisInfo(repo_info.owner, repo_info.repo_name, rest_api_url_map.pulls, pulls_args)
    merged_prs += pr_data.data.length
    while (pr_data.data.length == 30) {
        pr_data = await raw_data_getter.getRepoBasisInfo(repo_info.owner, repo_info.repo_name, rest_api_url_map.pulls, pulls_args)
        merged_prs += pr_data.data.length
    }

    return merged_prs
}

const get_repo_list = async (repo_url) => {
    let self_repo_list = await fetch(repo_url)
        .then((res) => {
            return res.json()
        })
        .then((data) => {
            return data
        })
        .catch((error) => {})

    // let other_repo_list = 

    self_repo_list = repo_list.map((repo, i) => {
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
        }
    })

    // other_repo_list = other_repo_list.map((repo, i) => {})

    return self_repo_list
    // return self_repo_list, other_repo_list
}

const get_repo_value = async (repo_list) => {
    const repo_value = 0
    const new_repo_list = []
    for (const repo_info of repo_list) {
        const { merged_prs } = await get_repo_criteria_info(repo_info)
        const repo_importance = calculateRepoImportance(repo_info.stars, repo_info.forks, repo_info.watchs)
        const repo_contribution = calculateRepoContribution()
        const repo_value = calculateRepoValue(repo_importance, repo_contribution)

        new_repo_list.push({
            ...repo_info,
            repo_value,
        })
    }

    return repo_value
}

export const get_talent_value = async (repo_url, followers) => {
    const repo_list = await get_repo_list(repo_url)
    const repo_value = await get_repo_value(repo_list)
    // const {self_repo_list, other_repo_list} = await get_repo_list(repo_url)
    // const repo_value = await get_repo_value(self_repo_list, other_repo_list)

    const weight_repo_value = 0.4
    const weight_followers = 0.6

    const talent_value = weight_repo_value * repo_value + weight_followers * followers
    return talent_value
}
