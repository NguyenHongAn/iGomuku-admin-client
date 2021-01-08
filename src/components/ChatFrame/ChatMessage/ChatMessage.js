import React from 'react'

function ChatMessage({message, name}) {
    return (
        <>
        
        <p style={{marginBottom: 0}}>{`${name}: ${message}`}</p>
        </>
    )
}

export default ChatMessage;

