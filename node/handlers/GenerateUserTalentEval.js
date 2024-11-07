import OpenAI from 'openai'
import { rest_api_url_map } from '../rest_api_model_manager.js'
import { RawDataGetter } from './RawDataGetter.js'

export class GenerateUserTalentEval {
    constructor(username, talentValue = 30) {
        this.username = username
        this.talentValue = talentValue
        this.repos = []
        this.bio = ''
        this.blogUrl = ''
        this.blogInfo = ''
        this.repoInfo = ``
        this.langs = {}
        this.repos = []
        this.openai = new OpenAI({
            apiKey: process.env.DASHSCOPE_API_KEY,
            baseURL: 'https://dashscope.aliyuncs.com/compatible-mode/v1',
        })
        this.rawDataGetter = new RawDataGetter()
    }

    async extractRepoList() {
        const repos = await this.rawDataGetter.getRepoList(this.username)
        let splice_end_index = 2
        if (repos.length == 0) return []
        if (repos.length == 1) splice_end_index = 1
        const filteredRepos = repos
            .filter((repo) => !repo.fork)
            .sort((a, b) => b.stargazers_count - a.stargazers_count)
            .slice(0, splice_end_index)
            .map((repo) => repo.name)

        return filteredRepos
    }

    /**
     * 异步提取指定用户的GitHub个人简介（Bio）。
     * @async
     * @returns {Promise<string | undefined>} - 返回一个包含用户Bio的Promise对象。
     */
    async extractBio() {
        const userInfo = await this.rawDataGetter.getUserBasisInfo(this.username, rest_api_url_map.username_users)
        const bio = userInfo.data.bio
        return bio
    }

    /**
     * 异步提取指定用户的非fork仓库列表。
     * @async
     * @returns {Promise<Array<string>>} - 返回一个包含非fork仓库名称的数组的Promise对象。
     * @throws {Error} 如果获取仓库列表时发生错误。
     */
    async extractBlogUrl() {
        const userInfo = await this.rawDataGetter.getUserBasisInfo(this.username, rest_api_url_map.username_users)
        const blogUrl = userInfo.data.blog
        return blogUrl
    }

    /**
     * 提取仓库README信息。
     * @async
     * @returns {Promise<string>} - 返回累加的仓库信息字符串的Promise对象。
     */
    async extractRepoInfo() {
        let repos = [...this.repos]
        let repoInfo = ''
        while (repos.length > 0) {
            const repo = repos.pop()
            try {
                const repoREADMEResponse = await this.rawDataGetter.getRepoREADME(this.username, repo)
                // 检查响应结构
                if (!repoREADMEResponse || !repoREADMEResponse.data || !repoREADMEResponse.data.content) {
                    console.warn(`仓库 ${repo} 的 README 内容为空或未定义。`)
                    continue // 跳过当前仓库
                }

                // 解码 base64 内容
                const repoREADME = Buffer.from(repoREADMEResponse.data.content, 'base64').toString('utf-8')
                repoInfo += repoREADME
            } catch (error) {
                if (error.status === 404) {
                    console.warn(`仓库 ${repo} 没有 README 文件。`)
                    continue // 跳过当前仓库
                }
                console.error(`获取仓库 ${repo} README 时出错:`, error)
            }
        }
        return repoInfo
    }

    /**
     * 提取仓库中的编程语言信息并累加到当前对象的 `langs` 属性中。
     * @async
     * @returns {Promise<void>} - 返回累加的用户编程语言信息的Promise对象。
     * @throws {Error} 如果获取语言信息时发生错误。
     */
    async extractLangs() {
        let repos = [...this.repos]
        let langs = {}
        while (repos.length > 0) {
            const repo = repos.pop()
            const langsResponse = await this.rawDataGetter.getRepoBasisInfo(this.username, repo, rest_api_url_map.languages)
            const repoLangs = langsResponse.data
            for (const [key, value] of Object.entries(repoLangs)) {
                if (langs[key]) {
                    langs[key] += value
                } else {
                    langs[key] = value
                }
            }
        }
        const sortedLangs = Object.entries(langs)
            .sort(([, a], [, b]) => b - a) // 按值从大到小排序
            .reduce((acc, [key, value]) => {
                acc[key] = value
                return acc
            }, {})

        return sortedLangs
    }

    //TODO: 需要获取项目的重要程度，当前获取的前二项目不是最重要的，而且没有剔除fork的。
    /**
     * 根据Github开发者的Bio、TalentValue、Langs等来生成用户的技术能力评估报告。
     * @async
     * @returns {Promise} 包含生成的技术能力评估报告的Promise对象。
     */
    async summaryByLLM() {
        this.repos = await this.extractRepoList()
        this.bio = await this.extractBio()
        this.blogUrl = await this.extractBlogUrl()
        this.repoInfo = await this.extractRepoInfo()
        this.langs = await this.extractLangs()

        const prompt = `请参考以下输出模板和开发者信息生成用户的技术能力评估报告：
                        输出模板：

                            # {{username}} 技术能力评估报告：

                            ## **个人信息**
                            - **用户名**：{{username}}
                            - **个人简介**：{{bio}}
                            - **博客网址**：{{blogUrl}}

                            ## **技术能力评分**
                            - **技术评分**：{{talentValue}}，该用户是一个技术水平较高的开发者。
                            - **编程语言与技术栈**：
                            - **Python**：{{langs.Python}}
                            - **JavaScript**：{{langs.JavaScript}}
                            - **CUDA**：{{langs.Cuda}}

                            ## **主要贡献与项目评估**
                            代表项目概述：
                            - **项目 1**：{{project_1_name}}
                            - **贡献分析**：简要描述该项目中开发者的技术贡献及影响。

                            - **项目 2**：{{project_2_name}}
                            - **贡献分析**：简要描述该项目中开发者的技术贡献及影响。

                            ## **综合技术能力评估**
                            - **技术领域总结**：
                            - 在 **前端开发** 方面：简要描述开发者的前端能力，突出其在 UI 设计或交互开发中的技术。
                            - 在 **深度学习与AI应用** 方面：简要描述开发者在深度学习框架（如 TensorFlow、PyTorch）和 AI 应用领域的贡献。
                            - 在 **编程语言能力**：突出开发者在 Python 和 JavaScript 等语言的应用能力，适用于数据科学、AI 或前端开发等多个领域。

                            ### **总体评估**：
                            - {{username}} 展现了在前端开发、深度学习、AI 应用等多个技术领域的强大能力，适合多种技术需求的开发任务，值得关注与合作。

                        开发者信息：
                            - **用户名**：${this.username}
                            - **个人简介**：${this.bio}
                            - **技术得分**：${this.talentValue}
                            - **博客链接**：${this.blogUrl}
                            - **项目概览**：${this.repoInfo}
                            - **编程语言偏好**：${this.langs}

                        请在报告中分析用户的技术深度、贡献领域及语言偏好，并对用户的专业方向提出简要总结。语言应精炼、专业。项目评估只输出最有含金量的两个项目，编程语言和技术栈只输出使用次数最多的三个语言，不包括文本语言。
                    `

        const completion = await this.openai.chat.completions.create({
            model: 'qwen-plus',
            messages: [
                {
                    role: 'system',
                    content: `您将为用户生成一份简洁而专业的技术能力评估报告。请严格按照给定的格式输出，不要添加额外的内容或过多描述。保持内容精炼、客观，避免主观评论或情感化的语言。输出需包含以下结构：

                            1. **个人信息**：包括用户名、个人简介、博客信息及网址。
                            2. **技术能力评分**：列出技术评分和编程语言使用情况。
                            3. **主要贡献与项目评估**：仅用一句话简要总结开发者的代表项目，不要展开技术细节。
                            4. **综合技术能力评估**：简要概述开发者的整体技术能力，避免具体项目名称，突出其在主要技术领域的能力。

                            所有内容必须严格遵循模板格式，保持信息清晰、简洁，不要多余说明。格式中仅需简要提及项目内容，无需罗列具体的技术栈或功能列表。编程语言仅展示语言偏好频率最高的三个，并根据其技术评分对其技术能力评价。
                        `,
                },
                { role: 'user', content: prompt },
            ],
            stream: false,
            enable_search: true,
            type: 'text',
        })
        
        return completion
    }
}
