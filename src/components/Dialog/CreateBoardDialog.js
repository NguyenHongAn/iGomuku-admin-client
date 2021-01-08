import React, {useState} from 'react';
import {useHistory} from "react-router-dom";
import {Modal, Form, Button} from 'react-bootstrap';
import axiosInstance from '../../api';
import {useSelector, useDispatch} from 'react-redux';
import {useToasts} from 'react-toast-notifications';


function CreateBoardDialog({show, handleClose}) {

    const [boardName, setBoardName] = useState("Caro Board");
    const [usePass, setUsePassword] = useState(false);
    const [password, setPassword] = useState("");
    const {autoMatch,fullname, userID} = useSelector(state => ({
        autoMatch: state.auth.autoMatch,
        fullname: state.auth.fullname,
        userID: state.auth.userID,
    }));
 
    const socketID = useSelector(state => state.socket.socket.id);
    const history = useHistory();
    const player = useSelector(state => state.match.player);
    const dispatch = useDispatch();

    const { addToast } = useToasts();

    const handleCreateBoard = async (e) =>{
        e.preventDefault();
        try{
            //post dữ liệu tạo ván đấu mới
            const data = {
                ownerName: fullname,
                userID: userID,
                boardName: boardName,
                isPrivate: usePass,
                password: password,
                socketID: socketID,
            }

            if (typeof player._id !== 'undefined')
            {
                data.player = player;
            }

            const response = await axiosInstance.post(`/board/create`, data);
            //tạo payload
            const payload = {
                boardID: response.data._id,
                boardName: boardName,
                owner:{
                    fullname,
                    userID
                },
                player: player, 
                status: 1,
            }

            //lưu thông tin người tạo ván đấu
            dispatch({
                type: "match/create",
                payload: payload
            })
            
            //thông báo tới người chơi nếu được mời qua socket ID
            if (typeof player._id !== 'undefined')
            {
                addToast("Create match success, Waitting fo opponent", 
                { 
                    appearance: 'success',
                    autoDismiss: true,
                    autoDismissTimeout: 10000,
                });    
            }
            else {
                history.push(`/board/${response.data._id}`);
            }
            handleClose();
            
        }
        catch(error)
        {
            addToast(error.response.data.message, {
                appearance: 'error',
                autoDismiss: true,
            });
        }
    }

    const handleCancel = () =>{
        dispatch({
            type: "match/clearPlayer"
        })
        handleClose();
    }

    return (
        <Modal show={show} onHide={handleClose} animation={true} className="modal-style">
            
            <Modal.Header closeButton>
                <Modal.Title>Create match</Modal.Title>
            </Modal.Header>

            <Modal.Body>
            <Form>
                <Form.Group controlId="formBoardName">
                    <Form.Label>Board Name</Form.Label>
                    <Form.Control type="text" placeholder="Enter board name ....." 
                    onChange={(e) => setBoardName(e.target.value)}
                    value={boardName}/>
                </Form.Group>
                <Form.Group controlId="formCheckbox" >
                    <Form.Check type="checkbox"
                    className="form-checkbox"
                    label="Use password ?" 
                    checked={usePass}
                    onChange={() =>{setUsePassword(!usePass)}}>
                    </Form.Check>                     
                </Form.Group>
                {
                    usePass?
                    <Form.Group controlId="fromPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" 
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}/>
                    </Form.Group>
                    :null
                }
            </Form>
            </Modal.Body>

            <Modal.Footer>
                <Button variant="warning" onClick={handleCancel}>Cancel</Button>
                <Button variant="info" onClick={handleCreateBoard}>Create</Button>
            </Modal.Footer>
        </Modal>
    )
}

export default CreateBoardDialog;

