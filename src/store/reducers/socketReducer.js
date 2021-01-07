const defaultState = {
    socket: null,
    socketID: "",
}

const scoketReducer = (state = defaultState, action) =>{
    switch (action.type) {
        case 'socket/setupsocket':  
           return {
               socket: action.payload,
               socketID: action.payload.id,
           }
    
        default:
            return state;
    }
}

export default scoketReducer;