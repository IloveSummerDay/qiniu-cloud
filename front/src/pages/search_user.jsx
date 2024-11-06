import { SearchOutlined } from '@ant-design/icons'
import { Button, Input, Pagination, Select, Spin, message } from 'antd'
import axios from 'axios'
import { useState } from 'react'
import SearchUesrResultItem from '../components/SearchUesrResultItem'

export default function SearchUesrPage() {
    const per_page = 5
    const [total_users_info_list, setTotalUserInfoList] = useState([])
    const [message_api, contextHolder] = message.useMessage()
    const [spinning, setSpinning] = useState(false)
    const [users_info_list, setUserInfoList] = useState([])
    const [total_users, setTotalUsers] = useState(0)
    const [input_value, setInputValue] = useState(undefined)
    const [match_type, setMatchType] = useState(-1)
    const [nation, setNation] = useState('China')
    const [current_page, setPage] = useState(1)

    const handleSearchUserInfoList = () => {
        if (total_users_info_list.length > 0) {
            message_api.open({
                type: 'warning',
                content: 'you have already searched',
            })
            return
        }
        if (!input_value) {
            message_api.open({
                type: 'error',
                content: 'search input value is empty',
            })
            return
        }
        if (match_type < 0) {
            message_api.open({
                type: 'error',
                content: 'match type is unselected',
            })
            return
        }

        let q = undefined
        if (match_type == 1) {
            q = input_value + ' in:login'
        } else if (match_type == 2) {
            q = 'user:' + input_value
        }

        const config = {
            method: 'post',
            url: 'http://localhost:12306/search-users-via-criteria',
            data: {
                q,
                nation,
            },
        }
        setSpinning(true)
        axios(config)
            .then(function (res) {
                const data = res.data
                const total_count = data.total_count
                setTotalUsers(total_count)

                setTotalUserInfoList(data.users_info_list)
                setUserInfoList(data.users_info_list.slice((current_page - 1) * per_page, current_page * per_page))
                setSpinning(false)
                console.log('==== search user res ====', total_count, data.users_info_list, current_page)
            })
            .catch(function () {
                message_api.open({
                    type: 'error',
                    content: 'when searching user, appear error',
                })
                setSpinning(false)
            })
    }

    const onPaginationClick = (changed_page, page_size) => {
        setPage(changed_page)
        setUserInfoList(
            total_users_info_list.slice((changed_page - 1) * per_page, changed_page * per_page > total_users_info_list.length ? total_users_info_list.length : changed_page * per_page)
        )
    }

    return (
        <>
            {contextHolder}
            <div className="w-[20rem] m-auto">
                <Input
                    placeholder="请输入用户名以搜索"
                    styles={{
                        input: {
                            width: 300,
                            marginTop: 10,
                        },
                    }}
                    maxLength={200}
                    value={input_value}
                    onChange={(e) => setInputValue(e.target.value)}
                />
                <div className="flex items-center">
                    <Select
                        style={{
                            width: 150,
                            marginTop: 10,
                        }}
                        defaultValue="请选择匹配类型"
                        onChange={(match_type) => setMatchType(match_type)}
                        options={[
                            {
                                value: 1,
                                label: '模糊匹配',
                            },
                            {
                                value: 2,
                                label: '完全匹配',
                            },
                        ]}
                    />
                </div>
                <div>
                    <Select
                        style={{
                            width: 150,
                            marginTop: 10,
                        }}
                        defaultValue={nation}
                        onChange={(nation) => setNation(nation)}
                        options={[
                            {
                                value: 'China',
                                label: 'China',
                            },
                            {
                                value: 'America',
                                label: 'America',
                            },
                        ]}
                    />
                </div>
                <div>
                    <Button
                        style={{
                            marginTop: 10,
                        }}
                        onClick={() => handleSearchUserInfoList()}
                        icon={<SearchOutlined />}
                        type="primary"
                        iconPosition="end"
                    >
                        Search
                    </Button>
                </div>
            </div>
            {total_users_info_list.length > 0 ? (
                <Pagination align="center" style={{ marginTop: 30 }} defaultPageSize={5} defaultCurrent={current_page} total={total_users} onChange={onPaginationClick} />
            ) : (
                <div className="text-center mt-[5rem]">请输入GitHub开发者用户名，以搜索开发者评估排名</div>
            )}
            <div className="mt-4 flex flex-col items-center">
                {users_info_list.map((user_info) => {
                    return (
                        <div key={user_info.id}>
                            <SearchUesrResultItem
                                username={user_info.login_name}
                                avatar_url={user_info.avatar_url}
                                followers={user_info.followers}
                                public_repos={user_info.public_repos}
                                talent_value={user_info.talent_value}
                                html_url={user_info.html_url}
                            />
                        </div>
                    )
                })}
            </div>
            <Spin spinning={spinning} fullscreen />
        </>
    )
}
