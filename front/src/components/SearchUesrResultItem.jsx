import { GithubOutlined } from '@ant-design/icons'
import { Button, ConfigProvider, Modal, Popover, Space } from 'antd'
import { createStyles } from 'antd-style'
import axios from 'axios'
import { marked } from 'marked'
import { useState } from 'react'

const useStyle = createStyles(({ prefixCls, css }) => ({
    linearGradientButton: css`
        &.${prefixCls}-btn-primary:not([disabled]):not(.${prefixCls}-btn-dangerous) {
            border-width: 0;

            > span {
                position: relative;
            }

            &::before {
                content: '';
                background: linear-gradient(135deg, #6253e1, #04befe);
                position: absolute;
                inset: 0;
                opacity: 1;
                transition: all 0.3s;
                border-radius: inherit;
            }

            &:hover::before {f
                opacity: 0;
            }
        }
    `,
}))

export default function SearchUesrResultItem({ username, avatar_url, followers, public_repos, talent_value, html_url, nation }) {
    const { styles } = useStyle()
    const [open, setUserDetailEvaInfoPanelOpen] = useState(false)
    const [eva_html_text, setEvaHTMLText] = useState(false)
    const [loading, setLoading] = useState(true)
    const handleOpenUserDetailEvaInfoPanel = () => {
        setUserDetailEvaInfoPanelOpen(true)
        setLoading(true)

        const config = {
            method: 'post',
            url: 'http://localhost:12306/user-talent-eval-text',
            data: {
                username,
            },
        }

        axios(config)
            .then(function (res) {
                const eva_md_text = res.data
                setEvaHTMLText(marked.parse(eva_md_text))
                setLoading(false)
                console.log('==== seva_text ====', marked.parse(eva_md_text))
            })
            .catch(function () {
                setLoading(false)
                setUserDetailEvaInfoPanelOpen(false)
                console.log('when evaluating a user, appear error')
            })
    }
    return (
        <>
            <div className="w-[50%] h-20 mt-2 pl-4 relative rounded-lg border-2 border-[#d1d9e0] flex items-center">
                <img className="w-16 h-16 rounded-full mr-[1rem]" src={avatar_url} alt="" />
                <div className="flex flex-col justify-evenly items-start w-[15rem] h-[100%]">
                    <a href={html_url} target="_blank" className=" text-[#3169da]">
                        {username}
                    </a>
                    <div className="flex justify-center items-center text-[#66707a]">
                        <img src="/followers_icon.png" className="w-[1rem] h-[1rem]" alt="" />
                        <p>{followers}</p>
                        <img src="/repo_icon.png" className="w-[1rem] h-[1rem] ml-4" alt="" />
                        <p>{public_repos}</p>
                        <img src="/nation_icon.png" className="w-[1rem] h-[1rem] ml-4" alt="" />
                        <p>{nation}</p>
                    </div>
                </div>
                <ConfigProvider
                    button={{
                        className: styles.linearGradientButton,
                        style: {
                            width: 120,
                            height: 40,
                            marginLeft: 20,
                        },
                    }}
                >
                    <Space>
                        <Popover placement="top" content="Click to detailed evaluation information">
                            <Button type="primary" size="large" icon={<GithubOutlined />} onClick={handleOpenUserDetailEvaInfoPanel}>
                                Eva Button
                            </Button>
                        </Popover>
                    </Space>
                </ConfigProvider>
                <div className="h-[100%] absolute right-[1rem] flex flex-col items-center justify-center text-[#70ff94]">
                    <p>Talent Value</p>
                    <p className="text-[2rem] text-[#70ff94]">{talent_value}</p>
                </div>
            </div>
            <Modal
                title={loading ? <p>正在加载开发者详细评估信息，请耐心等待...</p> : <p className="text-xl">开发者详细评估信息如下：</p>}
                loading={loading}
                open={open}
                footer={null}
                width={1000}
                onCancel={() => setUserDetailEvaInfoPanelOpen(false)}
            >
                <div className="flex items-center">
                    <img className="w-16 h-16 rounded-full mr-[1rem]" src={avatar_url} alt="" />
                    <a href={html_url} target="_blank" className=" text-[#3169da] text-2xl">
                        {username}
                    </a>
                    <div className="ml-8 flex justify-center items-center text-[#66707a]">
                        <img src="/followers_icon.png" className="w-[1rem] h-[1rem]" alt="" />
                        <p>{followers}</p>
                        <img src="/repo_icon.png" className="w-[1rem] h-[1rem] ml-4" alt="" />
                        <p>{public_repos}</p>
                        <img src="/nation_icon.png" className="w-[1rem] h-[1rem] ml-4" alt="" />
                        <p>{nation}</p>
                    </div>
                </div>
                <p className="eva_html_text mt-4" dangerouslySetInnerHTML={{ __html: eva_html_text }}></p>
            </Modal>
        </>
    )
}
