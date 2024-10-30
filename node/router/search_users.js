import express from 'express'
import { RawDataGetter } from '../handlers/RawDataGetter.js'
import { rest_api_url_map } from '../rest_api_model_manager.js'
import { get_talent_value } from '../utils.js'

const router = express.Router()

router.get('/search-users-via-criteria', async (req, res) => {
    // query url args given by client
    const raw_data_getter = new RawDataGetter({ auth: process.env.GITHUB_TOKEN })
    const q = '?q=' + encodeURIComponent('IloveSummerD in:login')
    const sort = '&sort=' + 'repositories'
    const order = '&order=' + 'desc'
    const url = rest_api_url_map.search_users_via_criteria + q + sort + order

    const users_data = await raw_data_getter.getUsersViaCriteria(url)
    const users_info_data = users_data.data

    const total_count = users_info_data.total_count
    const incomplete_results = users_info_data.incomplete_results // pagination usage in future
    const users_info_list = users_info_data.items

    let last_users_info_list = []
    for (const user_info of users_info_list) {
        const login_name = user_info.login
        const avatar_url = user_info.avatar_url
        const html_url = user_info.html_url
        const followers = user_info.followers
        const repos_url = user_info.repos_url
        const talent_value = await get_talent_value(repos_url, followers)

        // need add more info about a user
        last_users_info_list.push({
            login_name,
            avatar_url,
            html_url,
            followers,
            talent_value: talent_value,
        })
    }

    // 筛选 + talent rank => last_users_info_list
    // ....

    res.json({
        total_count,
        users_info_list: last_users_info_list,
    })
})

export default router
