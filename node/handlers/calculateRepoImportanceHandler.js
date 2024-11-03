/**
 * 计算仓库的重要性评分
 * @param {Number} punblic_repo_sum - 用户创建项目总数
 * @param {Number} stars_sum - 用户创建项目的总的star数
 * @param {Number} forks_sum - 用户创建项目的总的fork数
 * @param {Number} watches_sum - 用户创建项目的总的watch数
 * @return {Number} - 用户创建项目的重要性评分
 */
export const calculateRepoImportance = (punblic_repo_sum, stars_sum, forks_sum, watches_sum) => {
    const weightPublicRepoSum = 0.4
    const weightStars = 0.6
    const weightForks = 0.7
    const weightWatches = 0.5

    const importance = weightPublicRepoSum * punblic_repo_sum + stars_sum * weightStars + forks_sum * weightForks + watches_sum * weightWatches

    return importance
}
