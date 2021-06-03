import React from "react";
import { BrowserRouter as Router, Switch, Link, Route } from "react-router-dom";
import { Layout, Menu } from "antd";
import { HomeOutlined, PieChartFilled } from "@ant-design/icons";
import Home from "./routes/Home";
import CodeEditor from "./routes/CodeEditor";
import "./App.css";
import {SocketContext, socket} from "./services/socket";


const { Sider } = Layout;

class App extends React.Component {
  state = {
    collapsed: false,
  };

  onCollapse = (collapsed) => {
    this.setState({ collapsed });
  };

  render() {
    const { collapsed } = this.state;

    return (
      <Router>
        <Layout style={{ minHeight: "100vh" }}>
          <Sider collapsible collapsed={collapsed} onCollapse={this.onCollapse}>
            <Menu theme="dark" defaultSelectedKeys={["0"]} mode="inline">
              <Menu.Item key="0" icon={<HomeOutlined />}>
                <Link to="/">Terminal</Link>
              </Menu.Item>
              <Menu.Item key="1" icon={<PieChartFilled />}>
                <Link to="/code-editor">Code Editor</Link>
              </Menu.Item>
            </Menu>
          </Sider>
          <Switch>
            <Route path="/code-editor">
            <SocketContext.Provider value={socket}>
                <CodeEditor language="Rust" />
            </SocketContext.Provider>
            </Route>
            <Route path="/">
            <SocketContext.Provider value={socket}>
                 <Home />
            </SocketContext.Provider>
            </Route>
          </Switch>
        </Layout>
      </Router>
    );
  }
}

export default App;

