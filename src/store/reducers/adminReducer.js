
const defaultState  = {
    viewingAccountStatus: -2,
    viewingUserID: "123abc",
    usersList: [],
    //friends: [],
};

const adminReducer = (state = defaultState, action) =>{
    switch (action.type) {
        // case 'onlineUser/update':
        //     return {
        //         ...state,
        //         users: action.payload,
        //     }
        case 'userslist/update':
            return {
                ...state,
                usersList: action.payload,
            }
        case 'userAccountStatus/update':
            {
                const newList = Array.from(state.usersList);
                newList.forEach(function(item){
                    if (item._id === action.payload.userID) {
                        item.accountStatus = action.payload.status;
                    }
                });
                return{
                    ...state,
                    usersList: newList,
                }
            }
        case 'viewingAccountStatus/update':
            {
                return {
                    ...state,
                    viewingAccountStatus: action.payload,
                }
            }
        case 'viewingUserID/update':
            {
                return {
                    ...state,
                    viewingUserID: action.payload,
                }
            }
        // case "onlineUser/addnew":
        //     {
        //         const newList = Array.from(state.users);
        //         for (let i =0; i<= newList.length ;i++)
        //         {
        //             if ( i === newList.length)
        //             {
        //                 newList.push(action.payload);
        //                 break;
        //             }
        //             if (newList[i]._id === action.payload._id)
        //             {
        //                 newList[i] = action.payload;
        //                 break;
        //             }
        //         }
        //         return{
        //             ...state,
        //             users: newList,
        //         }
        //     }
        default:
            return state;
    }
}

export default adminReducer;
