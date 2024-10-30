/**
 * @param {Number} userCommits - 用户的提交次数
 * @param {Number} totalCommits - 仓库的总提交次数
 * @return {Number} contriRatio - 用户对仓库的贡献度比例
 */
export const calculateRepoContribution = (userCommits, totalCommits) => {
    const contriRatio = userCommits / totalCommits;
    return contriRatio;
}
