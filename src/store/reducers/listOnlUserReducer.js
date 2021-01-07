
const defaultState  = {
    users: [],
    friends: [],
};

const listOnlUserReducer = (state = defaultState, action) =>{
    switch (action.type) {
        case 'onlineUser/update':
            return {
                ...state,
                users: action.payload,
            }
        case 'friends/update':
            return {
                ...state,
                friends: action.payload,
            }
        case "onlineUser/addnew":
            {
                const newList = Array.from(state.users);
                for (let i =0; i<= newList.length ;i++)
                {
                    if ( i === newList.length)
                    {
                        newList.push(action.payload);
                        break;
                    }
                    if (newList[i]._id === action.payload._id)
                    {
                        newList[i] = action.payload;
                        break;
                    }
                }
                return{
                    ...state,
                    users: newList,
                }
            }
        default:
            return state;
    }
}

export default listOnlUserReducer;
