
import React from 'react'
import { Layout, Breadcrumb } from 'antd';


// import {TerminalUI} from "./TerminalUI";
import { XTerm } from 'xterm-for-react';
import {SocketContext} from "./socket";

// import socket from "./socket"
// import { AttachAddon } from 'xterm-addon-attach';
const { Header, Content } = Layout;
// socket to server


const Terminal = () => {
  const xtermRef = React.useRef(null)
  const [input, setInput] = React.useState('');
  const socket = React.useContext(SocketContext);

  React.useEffect(() => {
      xtermRef.current.terminal.clear()
      xtermRef.current.terminal.writeln("")
      xtermRef.current.terminal.writeln(" Hello, User!")
      xtermRef.current.terminal.write(" $ ")
  }, [])
  
  const onData = (data) => {
    const code = data.charCodeAt(0);

    // code 13 is enter 
    if (code === 13) {

     if(input === "clear") {
      xtermRef.current.terminal.clear()
      xtermRef.current.terminal.write(" $ ")
      setInput('')
      return;
     }
     else {
      socket.emit("input", input);

      // data from server
      socket.once('output', (data) => {
       if (xtermRef.current != null){
         xtermRef.current.terminal.write("\n");
         xtermRef.current.terminal.writeln(data.trim());
         xtermRef.current.terminal.write(" $ ");
         setInput('');
       }

     });
     }
    } else if (code < 32 || code === 126) {
      // Disable control Keys such as arrow keys
      return;
    } else if (code === 127) {
      // figure out logic for backspace
      return;
    }
    else {
      // Add general key press characters to the terminal
      xtermRef.current.terminal.write(data);
      setInput((prev) => prev + data);
    }
  };

  return (
      <XTerm ref={xtermRef}  options={{ lineHeight: 1 , theme: { background: "#202B33"  ,foreground: "#F5F8FA", }}}  onData={onData}/>
  )
}


const Home = () => {
      
  return (
    <Layout className="site-layout">
    <Header className="site-layout-background" style={{ padding: 0 }} />
    <Content style={{ margin: '0 16px' }}>
      <Breadcrumb style={{ margin: '16px 0' }}>
        <Breadcrumb.Item>Terminal</Breadcrumb.Item>
        <Breadcrumb.Item>Bash</Breadcrumb.Item>
      </Breadcrumb>
      <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
        {/* <Terminal></Terminal> */}
       <Terminal></Terminal>
      </div>
      
    </Content>
  </Layout>
  )
}

export default Home;