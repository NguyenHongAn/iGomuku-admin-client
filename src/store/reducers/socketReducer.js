import { io } from 'socket.io-client';

const defaultState  = {
    socket: io(""), //link tới server 
};

const socketReducer = (state= defaultState, action) =>{
    switch (action.type) {
      
        default:
            return state;
    }
}

export default socketReducer;
