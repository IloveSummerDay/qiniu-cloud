/**
 * 计算仓库的重要性评分
 * @param {Number} stars - 仓库的star数
 * @param {Number} forks - 仓库的fork数
 * @param {Number} watches - 仓库的watch数
 * @param {Number} mergedPrs - 合并的Pull Requests数量
 * @param {Number} resolvedIssues - 解决的问题数量
 * @param {Number} unresolvedIssues - 未解决的问题数量
 * @param {Number} weeklyCommitActivity - 过去一周的提交活动频率
 * @param {Number} yearCommitActivity - 过去一年的提交活动频率
 * @return {Number} - 仓库的重要性评分，根据参数和预设权重计算得出
 */
export const calculateRepoImportance = (stars, forks, watches, mergedPrs, resolvedIssues, unresolvedIssues, weeklyCommitActivity, yearCommitActivity) => {
    const weightStars = 0.6;
    const weightForks = 0.7;
    const weightWatches = 0.5;
    const weightMergedPrs = 0.5;
    const weightResolvedIssues = 0.4;
    const weightUnresolvedIssues = -0.4;
    const weightWeeklyCommitActivity = 0.3;
    const weightYearCommitActivity = 0.4;

    const importance = stars * weightStars + forks * weightForks + watches * weightWatches + mergedPrs * weightMergedPrs + resolvedIssues * weightResolvedIssues + unresolvedIssues * weightUnresolvedIssues + weeklyCommitActivity * weightWeeklyCommitActivity + yearCommitActivity * weightYearCommitActivity;

    return importance;
}
