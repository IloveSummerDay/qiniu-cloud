import OpenAI from 'openai'
import { RawDataGetter } from './RawDataGetter.js'
import { rest_api_url_map } from '../rest_api_model_manager.js'

export class ProjectNation {
    constructor(location, followers, followings) {
        this.location = location
        this.followers = followers
        this.followings = followings
        this.rawDataGetter = new RawDataGetter()
        this.openai = new OpenAI({
            apiKey: process.env.DASHSCOPE_API_KEY,
            baseURL: 'https://dashscope.aliyuncs.com/compatible-mode/v1',
        })
    }

    /**
     * 检查位置字符串是否有效
     * @param {String} location - 需要验证的位置字符串
     * @returns {Boolean} - 如果位置字符串符合正则表达式模式，则返回true，否则返回false
     */
    isValidLocation(location) {
        const validLocationPattern = /^[a-zA-Z0-9\s,.-]*$/
        return validLocationPattern.test(location)
    }

    /**
     * 通过Qwen将位置字符串转换为国家名称
     * @param {String} location
     * @returns {Promise<String>} - 返回国家名称的Promise对象
     */
    async projectLocation2Nation(location) {
        try {
            const completion = await this.openai.chat.completions.create({
                model: 'qwen-plus',
                messages: [
                    {
                        role: 'system',
                        content:
                            'You are a chatbot that validates addresses and returns the country if the address is valid. If the address is not valid, return "false". The address can include cities or provinces that can infer the country.',
                    },
                    {
                        role: 'user',
                        content: `Please validate the following address and only return the country name (like America) if it is valid, otherwise return "false": ${location}`,
                    },
                ],
                stream: false,
                enable_search: false,
                type: 'text',
            })

            const responseContent = completion.choices[0].message.content.trim()

            return responseContent
        } catch (error) {
            if (error.code === 'limit_requests') {
                console.error('Rate limit exceeded. Retrying after delay...')
                await this.delay(1000) // 等待 1 秒后重试
                return this.projectLocation2Nation(location)
            } else {
                throw error
            }
        }
    }

    /**
     * 通过Qwen将位置字符串数组转换为国家名称数组
     * @param {String[]} locations
     * @returns {Promise<String[]>} - 返回国家名称数组的Promise对象
     */
    async projectLocations2Nations(locations) {
        const nationPromises = locations.map((location) => this.projectLocation2Nation(location))
        return await Promise.all(nationPromises)
    }

    /**
     * 计算国家预测的置信度
     * @param {String[]} nations
     * @returns {Object} - 包含最频繁的国家名称和置信度的对象
     */
    calculateConfidence(nations) {
        const nationCounts = nations.reduce((acc, nation) => {
            if (nation !== 'false') {
                acc[nation] = (acc[nation] || 0) + 1
            }
            return acc
        }, {})

        const totalValid = Object.values(nationCounts).reduce((acc, count) => acc + count, 0)

        let mostFrequentNation = null
        let maxCount = 0

        for (const [nation, count] of Object.entries(nationCounts)) {
            if (count > maxCount) {
                maxCount = count
                mostFrequentNation = nation
            }
        }

        const confidence = maxCount / totalValid

        return { mostFrequentNation, confidence }
    }

    /**
     * 获取项目国家名称
     * @returns {Promise<String>} - 返回项目国家名称的Promise对象
     */
    async getNation() {
        if (this.isValidLocation(this.location)) {
            const nation = await this.projectLocation2Nation(this.location)
            if (nation !== 'false') {
                return nation
            }
        }

        const followersData = this.followers.data
        const followingsData = this.followings.data
        const followList = followersData.concat(followingsData)

        const userPromises = followList.map((user) => this.rawDataGetter.getUserBasisInfo(user.login, rest_api_url_map.username_users))

        try {
            const userResponses = await Promise.all(userPromises)
            const locations = userResponses
                .map((response) => {
                    const userData = response.data

                    if (this.isValidLocation(userData.location)) {
                        return userData.location
                    }
                    return null
                })
                .filter((location) => location !== null)

            if (!locations || locations.length === 0) {
                return 'N/A'
            }

            const nations = await this.projectLocations2Nations(locations)

            const { mostFrequentNation, confidence } = this.calculateConfidence(nations)

            if (confidence >= 0.3) {
                return mostFrequentNation
            } else {
                return 'N/A'
            }
        } catch (error) {
            console.error('Error fetching user data:', error)
            throw error
        }
    }

    /**
     * 延迟执行
     * @param {Any} ms - 延迟的毫秒数
     * @returns {Promise} - 包含延迟结果的Promise对象
     */
    delay(ms) {
        return new Promise((resolve) => setTimeout(resolve, ms))
    }
}
