import { calculateRepoImportance } from '../handlers/calculateRepoImportanceHandler.js'

export const get_repo_importance_value = async (repo_list) => {
    let punblic_repo_sum = 0
    let stars_sum = 0
    let forks_sum = 0
    let watchs_sum = 0
    for (const repo of repo_list) {
        if (repo.fork == false) {
            punblic_repo_sum += 1
            stars_sum += repo.stargazers_count
            forks_sum += repo.forks_count
            watchs_sum += repo.watchers_count
        }
    }

    console.log('get_repo_importance_value.js - ', punblic_repo_sum, stars_sum, forks_sum, watchs_sum)

    const repo_importance_value = calculateRepoImportance(punblic_repo_sum, stars_sum, forks_sum, watchs_sum)
    return repo_importance_value
}
