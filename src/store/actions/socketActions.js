import { io } from 'socket.io-client';

const APIURL = process.env.REACT_APP_ENV === "dev" ? process.env.REACT_APP_APIURL : process.env.REACT_APP_DEPLOY_APIURL;
const setupSocket = () => {
    return (dispatch) =>{
        const socket = io(APIURL, // link tới server
                        {
                            reconnectionDelayMax: 10000,
                            transports: [ 'websocket' ] 
                        });
       
        dispatch({
            type: "socket/setupsocket",
            payload: socket,
        });
       
    }
}

export const socketActions={
    setupSocket,
};