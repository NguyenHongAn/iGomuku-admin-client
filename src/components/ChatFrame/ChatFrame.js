import ChatMessageHistory from './ChatMessageHistory/ChatMessageHistory';
import React, {useState, useEffect} from 'react';
import {useSelector} from "react-redux";
import {Button} from 'react-bootstrap';
 
function ChatFrame() {

    const {fullname} = useSelector(state => ({
        fullname: state.auth.fullname
    }));
    const socket = useSelector(state => state.socket.socket);

    const boardID = useSelector(state=> state.match.boardID);

    const [messages, setMessages] = useState([]);

    const [inputText, setinputText] = useState("");

     useEffect(()=>{
       
        socket.on("receive_message", (dataReveive)=>{

            const messageRevcive = JSON.parse(dataReveive);
            //console.log(messageRevcive);
            const nextMessages = messages.concat({
                message: messageRevcive.inputText, 
                fullname: messageRevcive.fullname,
            });
            setMessages(nextMessages);
        })
     },[messages, socket]);

    const handleSubmit = (e) => {
        e.preventDefault();
        const nextMessages = messages.concat([{ message: inputText, fullname }]);
        const nextInputText = '';
        //real time to another player in board
        socket.emit("send_message", JSON.stringify({boardID, fullname, inputText}));
        setMessages(nextMessages);
        setinputText(nextInputText);
     };

    const windowStyles = {
           width: '100%',
    };
        
    const formStyles = {
           display: 'flex',
        };
        
    const inputStyles = {
          flex: '1 auto'
        };
    
    const scrollDiv ={
        overflow: "auto",
        height: "320px",
    }
    return (
        <div style={windowStyles}>
            <div style={scrollDiv}>
                <ChatMessageHistory messages={messages} />
            </div>
           
           <form style={formStyles} onSubmit={handleSubmit}>
              <input style={inputStyles} type="text" onChange={(e) => setinputText(e.target.value)} 
              value={inputText} />
              <Button variant="primary" type="submit">Send</Button>
           </form>
        </div>
     );
 }
 
 export default ChatFrame;
 
 