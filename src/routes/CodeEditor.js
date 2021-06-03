
import React, { useState, useEffect } from "react";
import Prism from "prismjs";
import { Layout, Breadcrumb, Button } from 'antd';

import "./styles.css";

const { Header, Content } = Layout;

const CodeEditor = props => {
    const [content, setContent] = useState(props.content);
    const [code, setCode] = useState(null);
  
    const handleKeyDown = evt => {
      let value = content,
        selStartPos = evt.currentTarget.selectionStart;
  
      console.log(evt.currentTarget);
  
      // handle 4-space indent on
      if (evt.key === "Tab") {
        value =
          value.substring(0, selStartPos) +
          "    " +
          value.substring(selStartPos, value.length);
        evt.currentTarget.selectionStart = selStartPos + 3;
        evt.currentTarget.selectionEnd = selStartPos + 4;
        evt.preventDefault();
  
        setContent(value);
      }
    };
  
    useEffect(() => {
      Prism.highlightAll();
    }, [props.language, content]);

    const handleOnClick = () => {
        console.log(content);
        setCode(content);
    }
  
    return (
        <Layout className="site-layout">
        <Header className="site-layout-background" style={{ padding: 0 }} />
        <Content style={{ margin: '0 16px' }}>
          <Breadcrumb style={{ margin: '16px 0' }}>
            <Breadcrumb.Item>Editor</Breadcrumb.Item>
            <Breadcrumb.Item>Rust</Breadcrumb.Item>
          </Breadcrumb>
          <Button type="primary" style={{ margin: '16px 0' }} onClick={handleOnClick}>Save Code</Button>
          <Button type="primary" style={{ margin: '16px 16px' }}>Run Code</Button>
          <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
            <div className="code-edit-container">
        <textarea
          className="code-input"
          value={content}
          onChange={evt => setContent(evt.target.value)}
          onKeyDown={handleKeyDown}
        />
        <pre className="code-output">
          <code className={`language-${props.language}`}>{content}</code>
        </pre>
      </div>
          </div>
          {/* <Button type="primary">Primary Button</Button> */}
        </Content>
      </Layout>
      
    );
};


export default CodeEditor;