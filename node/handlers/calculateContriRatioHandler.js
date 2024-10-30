/**
 * @param {Number} userCommits - 用户的提交次数
 * @param {Number} totalCommits - 仓库的总提交次数
 * @param {Number} userCommitPullRequests - 用户提交pr次数
 * @param {Number} userPullRequestReviews - 用户的pr review次数
 * @return {Number} contriRatio - 用户对仓库的贡献度比例
 */
export const calculateRepoContribution = (userCommits, totalCommits, userCommitPullRequests, userPullRequestReviews) => {
    // const weightUserCommits = 0.6
    // const weightUserCommitPullRequests = 0.6
    // const weightUserPullRequestReviews = 0.6

    const contriRatio = userCommits / totalCommits
    return contriRatio
}
