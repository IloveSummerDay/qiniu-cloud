/**
 * @param {Number} repoImportance - 项目重要程度
 * @param {Number} repoContribution - 开发者对项目的贡献度
 * @return {Number} repoValue - 项目价值
 */
export const calculateRepoValue = (repoImportance, repoContribution) => {
    const repoValue = repoImportance * repoContribution
    return repoValue
}
