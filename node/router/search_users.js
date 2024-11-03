import express from 'express'
import multer from 'multer'
import { RawDataGetter } from '../handlers/RawDataGetter.js'
import { rest_api_url_map } from '../rest_api_model_manager.js'
import { get_talent_value } from '../utils/get_talent_value.js'

const router = express.Router()

router.get('/search-users-via-criteria', multer().none(), async (req, res) => {
    console.log(req.body.q, req.body.sort, req.body.order)

    const q = '?q=' + encodeURIComponent(req.body.q)
    const sort = '&sort=' + req.body.sort
    const order = '&order=' + req.body.order
    const search_user_url = rest_api_url_map.search_users_via_criteria + q + sort + order

    const raw_data_getter = new RawDataGetter()
    const users_data = await raw_data_getter.getUsersViaCriteria(search_user_url)

    const users_info_data = users_data.data
    const total_count = users_info_data.total_count
    const incomplete_results = users_info_data.incomplete_results // pagination usage in future
    const users_info_list = users_info_data.items

    if (users_info_list.length == 0) {
        return res.json({
            total_count,
            users_info_list: [],
        })
    }

    let last_users_info_list = []
    for (const user_info of users_info_list) {
        const login_name = user_info.login
        const avatar_url = user_info.avatar_url
        const html_url = user_info.html_url

        const detail_user_info_res = await raw_data_getter.getUserBasisInfo(login_name, rest_api_url_map.username_users)
        const detail_user_info = detail_user_info_res.data
        const followers = detail_user_info.followers
        const public_repos = detail_user_info.public_repos

        const talent_value = await get_talent_value(login_name, followers)

        // need add more info about a user
        last_users_info_list.push({
            login_name,
            avatar_url,
            html_url,
            followers,
            public_repos,
            talent_value: parseFloat(talent_value.toFixed(2)),
        })
    }

    // 筛选 + talent rank => last_users_info_list
    // ....

    return res.json({
        total_count,
        users_info_list: last_users_info_list,
    })
})

export default router
