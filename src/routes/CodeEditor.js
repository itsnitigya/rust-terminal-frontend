
import React, { useState, useEffect } from "react";
import Prism from "prismjs";
import { Layout, Breadcrumb, Button, Alert } from 'antd';
import {SocketContext} from "../services/socket";

import "./styles.css";

const { Header, Content } = Layout;

const CodeEditor = props => {
    const [content, setContent] = useState(props.content);
    const [code, setCode] = useState(null);
    const [output, setOutput] = useState("Output");
    const [success, setSuccess] = useState("");
    const [type, setType] = useState("info");
    const socket = React.useContext(SocketContext);
  
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

    const handleSaveClick = () => {
        console.log(content);
        setCode(content);
    }

    const handleRunClick = () => {
        socket.emit("input-code", code);

        socket.once('output-code', (data) => {
            setOutput(data);
            if(data.includes("error")) {
                setSuccess("Error");
                setType("error");
            } else {
                setSuccess("Success");
                setType("success");
            }
        });
    }
  
    return (
        <Layout className="site-layout">
        <Header className="site-layout-background" style={{ padding: 0 }} />
        <Content style={{ margin: '0 16px' }}>
          <Breadcrumb style={{ margin: '16px 0' }}>
            <Breadcrumb.Item>Editor</Breadcrumb.Item>
            <Breadcrumb.Item>Rust</Breadcrumb.Item>
          </Breadcrumb>
          <Button type="primary" style={{ margin: '16px 0' }} onClick={handleSaveClick}>Save Code</Button>
          <Button type="primary" style={{ margin: '16px 16px' }} onClick={handleRunClick}>Run Code</Button>
          <div className="site-layout-background" style={{ padding: 24, minHeight: 200 }}>
            <div className="code-edit-container">
        <textarea
          className="code-input"
          value={content}
          onChange={evt => setContent(evt.target.value)}
          onKeyDown={handleKeyDown}
        />
        <pre className="code-output">
          <code className={`language-${props.language}`}>
              {content}
           </code>
        </pre>
      </div>
          </div>
          <Alert
            style={{ margin: '16px 16px' }}
            message={success}
            description={output}
            type={type}
            showIcon
           />
        </Content>
      </Layout>
      
    );
};


export default CodeEditor;