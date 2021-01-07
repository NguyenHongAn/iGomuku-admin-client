
const updateOnlineUserlist = (onlineUsers) =>{
    return (dispatch) =>{
        dispatch({
            type: "onlineUser/update",
            payload: onlineUsers,
        });
    }
}

const addNewFriend = (newFriend) =>{
    return (dispatch) =>{
        dispatch({
            type: 'friends/addnew',
            payload: newFriend,
        })
    };
}

const updateFriendList = (friendList) =>{
    return (dispatch) =>{
        dispatch({
            type: 'friends/update',
            payload: friendList,
        })
    };
} 

const addNewUserOnline = (user) =>{
    return (dispatch)=>{
        dispatch({
            type: 'onlineUser/addnew',
            payload: user,
        })
    }
}

export const ListUserActions = {
    updateOnlineUserlist,
    addNewFriend,
    updateFriendList,
    addNewUserOnline,
}

