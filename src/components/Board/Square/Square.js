import React from 'react'

function Square({position,handleClick, children, winningLine}) {
    const strClassName = winningLine ? winningLine + " square": "square";
    return (
        <button className={strClassName} onClick={() => handleClick(position, false)}>
            {children}
        </button>
    )
}

export default Square
