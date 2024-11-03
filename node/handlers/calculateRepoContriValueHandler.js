/**
 * @param {Number} prs_sum - 用户发起的总的pr次数
 * @param {Number} closed_prs_sum - 用户发起的总的closed_prs次数
 * @param {Number} merged_prs_sum - 用户发起的总的merged_prs次数
 * @return {Number} 用户对项目仓库的贡献度值
 */
export const calculateRepoContribution = (prs_sum, closed_prs_sum, merged_prs_sum) => {
    const weight_prs = 0.2
    const weight_closed_prs = 0.1
    const weight_merged_prs = 0.4

    const repo_contribution_value = prs_sum * weight_prs + closed_prs_sum * weight_closed_prs + merged_prs_sum * weight_merged_prs
    return repo_contribution_value
}
