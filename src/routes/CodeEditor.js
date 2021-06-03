
import React from 'react'
import { Layout, Breadcrumb } from 'antd';

const { Header, Content } = Layout;

const CodeEditor = () => {
  return (
    <Layout className="site-layout">
    <Header className="site-layout-background" style={{ padding: 0 }} />
    <Content style={{ margin: '0 16px' }}>
      <Breadcrumb style={{ margin: '16px 0' }}>
        <Breadcrumb.Item>Code</Breadcrumb.Item>
        <Breadcrumb.Item>Rust</Breadcrumb.Item>
      </Breadcrumb>
      <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
        Code Editor Coming
      </div>
    </Content>
  </Layout>
  )
}

export default CodeEditor;