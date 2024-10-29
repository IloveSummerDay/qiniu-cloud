import { Octokit } from 'octokit'

export class RawDataGetter {
    constructor(options) {
        this.options = {
            auth: process.env.GITHUB_TOKEN,
        }

        Object.assign(this.options, options)
        this.octokit = new Octokit({ auth: this.options.auth })
        this.headers = {
            'X-GitHub-Api-Version': '2022-11-28',
            accept: 'application/vnd.github+json',
        }
    }

    /**
     * @param {string} owner - 仓库所有者的用户名。
     * @param {string} repo - 仓库的名称。
     * @param {string} url - GitHub API URL - stars | forks | subscribers | pulls。
     * @param {object} otherArgs - 其他查询参数
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
     * @param {string} username - 仓库所有者的用户名。
     * @param {string} url - GitHub API URL - followers | following | users
     * @param {object} otherArgs - 其他查询参数
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
     * @param {string} url - 拼接查询参数后的url
     * @return {Promise} 包含请求结果的Promise对象。
     */
    async getUserViaCriteria(url) {
        return await this.octokit.request(url, {
            headers: this.headers,
        })
    }
}
