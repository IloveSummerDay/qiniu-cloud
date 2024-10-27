import { Octokit } from "octokit";

export class RawDataGetter {
    constructor(options) {
        this.options = {
            auth: "",
        }

        Object.assign(this.options, options)
        this.octokit = new Octokit({ auth: this.options.auth })
        this.headers = {
            'X-GitHub-Api-Version': '2022-11-28',
            'accept': "application/vnd.github+json"
        }
    }

    /**
     * @param {string} owner - 仓库所有者的用户名。
     * @param {string} repo - 仓库的名称。
     * @param {string} url - GitHub API URL - stars | forks | subscribers | pulls。
     * @param {object} other_args - 其他查询参数
     * @return {Promise} 包含请求结果的Promise对象。
     */
    async get_repo_basis_info(owner, repo, url, other_args) {

        return await this.octokit.request(url, {
            headers: this.headers,
            owner,
            repo,
            ...other_args,
        })
    }

    /**
     * @param {string} username - 仓库所有者的用户名。
     * @param {string} url - GitHub API URL - followers | following | users
     * @param {object} other_args - 其他查询参数
     * @return {Promise} 包含请求结果的Promise对象。
     */
    async get_user_basis_info(username, url, other_args) {
        return await this.octokit.request(url, {
            headers: this.headers,
            username,
            ...other_args,
        })
    }

}