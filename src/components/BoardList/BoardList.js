import React from 'react';
import BoardListItem from './BoardListItem';
import {CardColumns} from "react-bootstrap";
import "./BoardList.css";

function BoardList({boards}) {

    return (
        <div>
            <CardColumns className="board-list">
            {   
                boards.map(board =>{
                    return <BoardListItem board={board} key={board._id}>

                    </BoardListItem>
                })
            }
            </CardColumns>
        </div>
    )
}

export default BoardList;
