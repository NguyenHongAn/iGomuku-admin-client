import React from 'react';
import ChatMessage from '../ChatMessage/ChatMessage';

function ChatMessageHistory({messages}) {   
    const createMessage = (message, index) => {
        const liStyles = {
           backgroundColor: ( index % 2 === 1 ) ? '#ddd' : '#efefef',
           padding: '2px',
           borderBottom: '1px solid #ddd',
           color: 'black'
        };  
        let name = message.fullname;
        if (message.fullname.indexOf(" ")!==-1)
        {
            name = message.fullname.substring(message.fullname.indexOf(" "));
        }
        
        return <li style={liStyles}><ChatMessage message={message.message} name={name} /></li>
     };
        
     const ulStyles = {
        listStyle: 'none',
        margin: 0,
        padding: 0,
        
     };
     
     return <ul style={ulStyles}>{messages.map(createMessage)}</ul>;
}

export default ChatMessageHistory;
