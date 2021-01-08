
const defaultState  = {
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
