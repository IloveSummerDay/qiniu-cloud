import { calculateRepoContribution } from '../handlers/calculateRepoContriValueHandler.js'
import { get_repo_pulls } from '../utils/get_repo_pulls.js'

export const get_repo_contribution_value = async (login_name, repo_list) => {
    let prs_sum = 0
    let closed_prs_sum = 0
    let merged_prs_sum = 0
    for (const repo of repo_list) {
        if (repo.fork == true && repo.disabled == false) {
            console.log(login_name, repo.disabled);
            
            const { prs, closed_prs, merged_prs } = await get_repo_pulls(login_name, repo.name)
            prs_sum += prs
            closed_prs_sum += closed_prs
            merged_prs_sum += merged_prs
        }
    }

    console.log('get_repo_contribution_value - ', prs_sum, closed_prs_sum, merged_prs_sum)

    const repo_contribution_value = calculateRepoContribution(prs_sum, closed_prs_sum, merged_prs_sum)
    return repo_contribution_value
}
