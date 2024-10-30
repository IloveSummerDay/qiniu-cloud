/**
 * 计算仓库的重要性评分
 * @param {Number} stars - 仓库的star数
 * @param {Number} forks - 仓库的fork数
 * @param {Number} watches - 仓库的watch数
 * @return {Number} - 仓库的重要性评分，根据参数和预设权重计算得出
 */
export const calculateRepoImportance = (stars, forks, watches) => {
    const weightStars = 0.6
    const weightForks = 0.7
    const weightWatches = 0.5

    const importance = stars * weightStars + forks * weightForks + watches * weightWatches

    return importance
}
