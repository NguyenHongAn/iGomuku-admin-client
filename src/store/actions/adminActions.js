
// const updateOnlineUserlist = (onlineUsers) =>{
//     return (dispatch) =>{
//         dispatch({
//             type: "onlineUser/update",
//             payload: onlineUsers,
//         });
//     }
// }

// const addNewFriend = (newFriend) =>{
//     return (dispatch) =>{
//         dispatch({
//             type: 'friends/addnew',
//             payload: newFriend,
//         })
//     };
// }

const updateUsersList = (usersList) =>{
    return (dispatch) =>{
        dispatch({
            type: 'userslist/update',
            payload: usersList,
        })
    };
} 

const updateUserAccountStatus = (payload) =>{
    return (dispatch) =>{
        dispatch({
            type: 'userAccountStatus/update',
            payload: payload,
        })
    };
} 

// const addNewUserOnline = (user) =>{
//     return (dispatch)=>{
//         dispatch({
//             type: 'onlineUser/addnew',
//             payload: user,
//         })
//     }
// }

export const adminActions = {
    updateUsersList,
    updateUserAccountStatus,
    // addNewFriend,
    // updateFriendList,
    // addNewUserOnline,
}

