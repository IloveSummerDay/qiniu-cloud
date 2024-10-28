import { Octokit } from "octokit";
import { rest_api_url_map } from "../utils/restApiModelManager";

const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
export class RawDataGetter {
    constructor(options) {
        this.options = {
            auth: GITHUB_TOKEN,
        };

        Object.assign(this.options, options);
        this.octokit = new Octokit({ auth: this.options.auth });
        this.headers = {
            "X-GitHub-Api-Version": "2022-11-28",
            accept: "application/vnd.github+json",
        };
    }

    /**
     * @param {string} owner - 仓库所有者的用户名。
     * @param {string} repo - 仓库的名称。
     * @param {object} otherArgs - 其他查询参数
     * @return {Promise} 包含请求结果的Promise对象。
     */
    async getRepoInfo(owner, repo, otherArgs = {}) {
        return await this.octokit.request(rest_api_url_map.repo_summary, {
            headers: this.headers,
            owner,
            repo,
            ...otherArgs,
        });
    }

    /**
     * @param {string} username - 仓库所有者的用户名。
     * @param {object} other_args - 其他查询参数
     * @return {Promise} 包含请求结果的Promise对象。
     */
    async getRepoStars(username, other_args) {
        return await this.octokit.request(rest_api_url_map.username_users, {
            headers: this.headers,
            username,
            ...other_args,
        });
    }
}
