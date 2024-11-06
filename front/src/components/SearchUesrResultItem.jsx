import { AntDesignOutlined } from '@ant-design/icons'
import { Button, ConfigProvider, Popover, Space } from 'antd'
import { createStyles } from 'antd-style'

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

export default function SearchUesrResultItem({ username, avatar_url, followers, public_repos, talent_value, html_url }) {
    const { styles } = useStyle()
    return (
        <div className="w-[30rem] h-20 mt-2 relative p-[.5rem] rounded-lg border-2 border-[#d1d9e0] flex items-center">
            <img className="w-16 h-16 rounded-full mr-[1rem]" src={avatar_url} alt="" />
            <div className="flex flex-col items-start w-[10rem]">
                <a href={html_url} target="_blank" className=" text-[#3169da] ">
                    {username}
                </a>
                <div className="flex justify-center items-center text-[#66707a]">
                    <img src="/followers_icon.png" className="w-[1rem] h-[1rem]" alt="" />
                    <p>{followers}</p>
                    <img src="/repo_icon.png" className="w-[1rem] h-[1rem] ml-4" alt="" />
                    <p>{public_repos}</p>
                </div>
            </div>

            <ConfigProvider
                button={{
                    className: styles.linearGradientButton,
                    style: {
                        width: 150,
                    },
                }}
            >
                <Space>
                    <Popover placement="top" content="Click to detailed evaluation information">
                        <Button type="primary" size="large" icon={<AntDesignOutlined />}>
                            Eva Button
                        </Button>
                    </Popover>
                </Space>
            </ConfigProvider>

            <p className="text-[2rem] text-[#70ff94] absolute right-[1rem]">{talent_value}</p>
        </div>
    )
}
