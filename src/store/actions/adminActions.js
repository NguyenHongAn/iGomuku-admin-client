
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

const updateViewingAccountStatus = (payload) =>{ // dùng cho trang profile, cập nhật trạng thái của user đang được xem
    return (dispatch) =>{
        dispatch({
            type: 'viewingAccountStatus/update',
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
    updateViewingAccountStatus,
    // addNewFriend,
    // updateFriendList,
    // addNewUserOnline,
}

