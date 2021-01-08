import React, {useState} from 'react'
import {Card, Button} from 'react-bootstrap';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLock, faLockOpen } from "@fortawesome/free-solid-svg-icons";
import {useSelector, useDispatch} from 'react-redux';
import axiosInstance from '../../api';
import ReduxAction from '../../store/actions';


function BoardListItem({board}) {
    
    const userID = useSelector(state => state.auth.userID);
    const dispatch = useDispatch();
    // const deleteBoard = async ()=>{
    //     try {
    //         const response = await axiosInstance.post('/board/delete', {boardID: board._id});
    //         //dispatch(ReduxAction.)
    //     } catch (error) {

    //     }
        

    // }
    return (
        <Card className="board-card">
        <Card.Body>
            <Card.Title><b>Board Name: </b> {board.boardName}</Card.Title>
            <Card.Subtitle className="mb-2 text-muted"><b>Board ID: </b>{board._id}</Card.Subtitle>
            <Card.Text className="board-info">
                <div className="board-status">
                    <p>Status:</p>
                    {board.boardStatus === 1?
                    (<p style={{"paddingLeft": "10px"}}>Watting <span className="dot-waitting"></span></p>)
                    : <p style={{"paddingLeft": "10px"}}>Playing <span className="dot-playing"></span></p>
                    }
                    <p style={{"padding": "0px 10px 0px 10px"}} >Password:</p>
                    <FontAwesomeIcon style={{"color": '#ffc107'}}
                    icon={ board.isPrivate? faLock: faLockOpen }>
                    </FontAwesomeIcon>
                </div> 
                <div className="board-players">
                    <p style={{"paddingRight": "10px"}}>Owner: {board.owner? board.owner.fullname: null} </p> 
                    {board.player?
                    <p style={{"padding": "0px 10px 0px 10px"}}>Player: {board.player.fullname}</p>
                    :null
                    }
                     <p style={{"padding": "0px 10px 0px 10px"}}>Watchers: {board.watchers.length}</p> 
                </div>
            </Card.Text>
            <div className="board-button">
                {/* {board.owner._id === userID?
                 <Button variant="warning">Delete Board</Button>
                :null
                } */}
                <Button variant="info">Join Board</Button>
            </div>
           
        </Card.Body>
        </Card>
    )
}

export default BoardListItem;
