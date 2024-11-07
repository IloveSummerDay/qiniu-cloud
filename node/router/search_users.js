import express from 'express'
import multer from 'multer'
import { ProjectNation } from '../handlers/ProjectNation.js'
import { RawDataGetter } from '../handlers/RawDataGetter.js'
import { rest_api_url_map } from '../rest_api_model_manager.js'
import { get_talent_value } from '../utils/get_talent_value.js'

const router = express.Router()

router.post('/search-users-via-criteria', multer().none(), async (req, res) => {
    console.log('user_search_query', req.body.q, req.body.nation)

    if (!req.body.q) {
        return res.json({
            total_count: 0,
            users_info_list: [],
            error_tip: 'q not found',
        })
    }
    const q = '?q=' + encodeURIComponent(req.body.q)
    const sort = '&sort=repositories'
    const order = '&order=desc'
    const per_page = '&per_page=1'
    const page = '&page=1'
    const search_user_url = rest_api_url_map.search_users_via_criteria + q + sort + order + per_page + page

    const raw_data_getter = new RawDataGetter()
    const users_data = await raw_data_getter.getUsersViaCriteria(search_user_url)
    const total_count = users_data.data.total_count

    const request_num = total_count >= 30 ? total_count / 30 : 0
    const remain_num = total_count % 30
    const users_info_promise_list = []
    for (let i = 0; i < request_num + 1; i++) {
        users_info_promise_list.push(
            new Promise((resolve, reject) => {
                const page = '&page=' + (i + 1)
                const per_page = '&per_page=' + (i == remain_num ? remain_num : 30)
                const search_user_url = rest_api_url_map.search_users_via_criteria + q + sort + order + per_page + page
                raw_data_getter
                    .getUsersViaCriteria(search_user_url)
                    .then((users_data) => {
                        resolve(users_data.data.items)
                    })
                    .catch((err) => {
                        reject()
                    })
            })
        )
    }

    const users_info_promise_list_res = await Promise.all(users_info_promise_list)
    const users_info_list = users_info_promise_list_res.flat()
    if (users_info_list.length == 0) {
        return res.json({
            total_count,
            users_info_list: [],
        })
    }

    const last_users_info_promise_list = []
    for (let i = 0; i < users_info_list.length; i++) {
        const user_info = users_info_list[i]
        const login_name = user_info.login
        const avatar_url = user_info.avatar_url
        const html_url = user_info.html_url

        last_users_info_promise_list.push(
            new Promise((resolve, reject) => {
                raw_data_getter
                    .getUserBasisInfo(login_name, rest_api_url_map.username_users)
                    .then(async (detail_user_info_res) => {
                        const detail_user_info = detail_user_info_res.data
                        const followers_num = detail_user_info.followers
                        const public_repos = detail_user_info.public_repos
                        const email = detail_user_info.email
                        const bio = detail_user_info.bio
                        const blog = detail_user_info.blog

                        const raw_location = detail_user_info.location
                        const followers_info_list = await raw_data_getter.getUserBasisInfo(login_name, rest_api_url_map.username_followers)
                        const followings_info_list = await raw_data_getter.getUserBasisInfo(login_name, rest_api_url_map.username_following)
                        const project_nation = new ProjectNation(raw_location, followers_info_list, followings_info_list)
                        let nation_location = await project_nation.getNation()
                        if (nation_location == 'Taiwan') nation_location = 'China'
                        get_talent_value(login_name, followers_num).then((talent_value) => {
                            resolve({
                                id: i,
                                login_name,
                                avatar_url,
                                html_url,
                                followers_num,
                                public_repos,
                                nation_location,
                                email,
                                bio,
                                blog,
                                talent_value: parseFloat(talent_value.toFixed(2)),
                            })
                        })
                    })
                    .catch((err) => {
                        reject(err)
                    })
            })
        )
    }

    let last_users_info_list = await Promise.all(last_users_info_promise_list)

    // desc
    last_users_info_list.sort((a, b) => b.talent_value - a.talent_value)

    // Nation
    const nation_category = req.body.nation
    if (nation_category !== '') {
        last_users_info_list = last_users_info_list.filter((user) => user.nation_location == nation_category)
    }

    return res.json({
        total_count,
        users_info_list: last_users_info_list,
    })
})

export default router
