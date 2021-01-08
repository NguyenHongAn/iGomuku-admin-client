import React from 'react';
import {Modal, Button} from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell } from "@fortawesome/free-solid-svg-icons";
import {useSelector, useDispatch} from "react-redux";
import {useToasts} from 'react-toast-notifications';
import axiosInstance from '../../api';
import {useHistory} from 'react-router-dom';
import ReduxAction from '../../store/actions';

function JoinBoardDialog({show, handleClose,player}) {

  const dispatch = useDispatch();

  const {addToast} = useToasts();
  const socket = useSelector(state => state.socket.socket);

  const  userID = useSelector(state => state.auth.userID)

  const history = useHistory();
  const denyInvite =()=>{



    handleClose();
  }

  const acceptInvite = async()=>{
    handleClose();
    //send joinboard request
    try {
      const boardID = player.boardID;
      const data = {
        boardID: boardID,
        userID: userID,
        socketID: socket.id,
      }

      const response = await axiosInstance.post(`/board/on-join`, data);

      const newMatch = {
        boardID: response.data._id,
        boardName: response.data.boardName,
        owner: response.data.ownerID, //id người tạo
        player: response.data.player,       //id người chập nhận lời mời cũng là người chơi
        status: response.data.boardStatus
      };
      
      dispatch(ReduxAction.match.startNewMatch(newMatch));
    
      history.push(`/board/${response.data._id}`);
    } catch (error) {
      console.log(error);
      addToast(error.response.data.message, {
        appearance: "error",
        autoDismiss: true,
      });
    }
    //get playerID
    
  }

    return (
        <Modal show={show} onHide={handleClose} animation={true} className="modal-style">   
          <div className="modal-content text-center">
          <Modal.Header closeButton>
            
              <Modal.Title> New Game</Modal.Title>
            
            </Modal.Header>
            {/* <!--Body--> */}
            <div class="modal-body">
      
              <FontAwesomeIcon icon={faBell} size="4x" style={{color: "yellow"}}></FontAwesomeIcon>
      
              <Modal.Body>{`${player.fullname} is inviting you to join the game`}</Modal.Body>
      
            </div>
      
            {/* <!--Footer--> */}
            <Modal.Footer>
                <Button variant="warning" onClick={denyInvite}>
                    Cancel
                </Button>
                <Button variant="info" onClick={acceptInvite}>
                    Accept
                </Button>
            </Modal.Footer>
          </div>
         
        </Modal>
    )
}

export default JoinBoardDialog;

