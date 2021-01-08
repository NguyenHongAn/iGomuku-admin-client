import React, {useEffect, useState} from 'react';
import {Nav } from "react-bootstrap";
import {useDispatch, useSelector} from 'react-redux';
import ReduxAction from '../../store/actions';
import UserListItem from './UserListItem/UserListItem';
import './UserList.css';
import { useToasts } from "react-toast-notifications";
import axiosInstance from '../../api';

function UserList() {
    
    //redux map state to props and map dispatch to props
    const {socket} = useSelector(state =>({
       socket: state.socket.socket,
    })
    );

    const {jwtToken, userID} = useSelector(state => ({
        jwtToken: state.auth.jwtToken,
        userID: state.auth.userID,
    }));

    const {onlineUsers,friends} = useSelector(state => ({
        onlineUsers: state.onlineUsers.users,
        friends: state.onlineUsers.friends,
    }));

    const dispatch = useDispatch();

    const { addToast } = useToasts();
   
    
    useEffect(() =>{
        //get online user list 
        //socket.emit("request-list-online-user", {userID});

        socket.on("response-online-user", ({user})=>{
            
            if(user._id !== userID)
            {
                console.log(user);
                dispatch(ReduxAction.users.addNewUserOnline(user));   
            }
        });
        socket.on("response-user-offline", ({offlineUser}) =>{
            const newUsersList = onlineUsers.filter(onlUser => onlUser._id !== offlineUser);
            dispatch(ReduxAction.users.updateOnlineUserlist(newUsersList));
        })

        return ()=>{
            socket.off("response-online-user");
            socket.on("response-user-offline");
        }
        // disconnect old socket each time re-render
    },[addToast, dispatch, onlineUsers, socket, userID]);

    useEffect(()=>{
        (async () =>{      
            // get friend's list with GET method
            if(userID !== "0")
            {        
                try {
                    const response = await axiosInstance.get(`/user/list-friend`,{
                        params: {
                            userId: userID
                            }
                      });
                    if (response.status === 200)
                    {
                        dispatch(ReduxAction.users.updateFriendList(response.data));
                    } 
                    
                } catch (error) {
                    console.log(error);
                    addToast(error.response.data.message, {
                        appearance: "error",
                        autoDismiss: true,
                      });
                }
            }
           
        })();
    },[addToast, dispatch, jwtToken, userID]);

    const [activeTab, setActiveTab] = useState('1');

    const toggle = tab => {
      if(activeTab !== tab) setActiveTab(tab);
    }

    return (
        <div className="table-pane">
            <Nav color='dark' variant="tabs" className="tabs-header">
                <Nav.Item>
                    <Nav.Link className={activeTab === '1' ? 'active active-link' : ''} onClick={() => toggle('1')}>
                   Online  User
                    </Nav.Link>
                </Nav.Item>
               {userID !== "0"? <Nav.Item>
                    <Nav.Link className={activeTab === '2' ? 'active active-link' : ''} onClick={() => toggle('2')}>
                        Friends 
                    </Nav.Link>
                </Nav.Item>
                :null}
            </Nav>
            <div style={{display: "block"}}>                                               
                {userID!=="0" && activeTab ==="2" ?
                friends.map(friend =>{
                    return <UserListItem user={friend} key={friend._id}></UserListItem>
                })
                :onlineUsers.map((user) =>{
                        return (
                           <UserListItem user={user} key={user._id}></UserListItem>
                        )
                    })
                }                     
            </div>
            
            
        </div>
    )
}


// const mapState = (state) =>({
//     listUser: Array.from(state.listOnlUser.users),
//     socket: state.listOnlUser.socket,
//   });
  
// const mapDispatch = (dispatch) => ({
//     setupSocket: () =>{
//         dispatch(UserListActions.setupSocket());
//     }
    
// });


export default UserList;
