import { Octokit } from 'octokit'

export class RawDataGetter {
    constructor() {
        this.octokit = new Octokit({ auth: process.env.GITHUB_TOKEN })
        this.headers = {
            'X-GitHub-Api-Version': '2022-11-28',
            accept: 'application/vnd.github+json',
        }
    }

    /**
     * @param {String} owner - 仓库所有者的用户名。
     * @param {String} repo - 仓库的名称。
     * @param {String} url - GitHub API URL - stars | forks | subscribers | pulls。
     * @param {Object} otherArgs - 其他查询参数
     * @return {Promise} 包含请求结果的Promise对象。
     */
    async getRepoBasisInfo(owner, repo, url, otherArgs = {}) {
        return await this.octokit.request(url, {
            headers: this.headers,
            owner,
            repo,
            ...otherArgs,
        })
    }

    /**
     * @param {String} username - 仓库所有者的用户名。
     * @param {String} url - GitHub API URL - followers | following | users
     * @param {Object} otherArgs - 其他查询参数
     * @return {Promise} 包含请求结果的Promise对象。
     */
    async getUserBasisInfo(username, url, otherArgs = {}) {
        return await this.octokit.request(url, {
            headers: this.headers,
            username,
            ...otherArgs,
        })
    }

    /**
     * @param {String} url - 拼接查询参数后的url
     * @return {Promise} 包含请求结果的Promise对象。
     */
    async getUsersViaCriteria(url) {
        return await this.octokit.request(url, {
            headers: this.headers,
        })
    }

    async getRepoAllPulls(user_name, repo_name) {
        const pulls = await this.octokit.paginate(this.octokit.rest.pulls.list, {
            owner: user_name,
            repo: repo_name,
            state: 'all',
        })

        return pulls
    }

    async getRepoList(user_name) {
        const repo_list = await this.octokit.paginate(this.octokit.rest.repos.listForUser, {
            username: user_name,
            type: 'all',
        })

        return repo_list
    }
}
