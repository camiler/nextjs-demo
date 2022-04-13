import { PieChartOutlined, UserOutlined } from '@ant-design/icons'
import { Layout as AntdLayout, Menu } from 'antd'
import { useRouter } from 'next/router'
import { useState } from 'react'

const { Header, Content, Footer, Sider } = AntdLayout

export default function Layout({ children }) {
  const [collapsed, setCollapsed] = useState<boolean>(false)
  const router = useRouter()

  const handleSelect = (data) => {
    router.push(data.keyPath.join('/'))
  }
  return (
    <AntdLayout className="h-screen">
      <Sider collapsible collapsed={collapsed} onCollapse={setCollapsed}>
        <div className="h-8 m-4 bg-white opacity-20" />
        <Menu theme="dark" mode="inline" onSelect={handleSelect}>
          <Menu.Item key="todo" icon={<PieChartOutlined />}>
            todo
          </Menu.Item>
          <Menu.Item key="demo" icon={<UserOutlined />}>
            demo
          </Menu.Item>
          <Menu.Item key="grid">grid</Menu.Item>
        </Menu>
      </Sider>
      <AntdLayout>
        <Header></Header>
        <Content className="bg-white p-3">{children}</Content>
        <Footer className="text-center bg-slate-50">
          NextJs Demo with Ant-design and tailwindCss ©2022 created by Lyue
        </Footer>
      </AntdLayout>
    </AntdLayout>
  )
}
