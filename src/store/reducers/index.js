import {combineReducers} from 'redux';
import listOnlUserReducer from './listOnlUserReducer';
import authReducer from './authReducer';
import socketReducer from './socketReducer';
import boardListReducer from './boardListReducer';
import matchReduecer from './matchReducer';
import uiReducer from './uiReducer';

//combine các reducer lại với nhau 
const allReducers = combineReducers({
    socket: socketReducer,
    auth: authReducer,
    onlineUsers: listOnlUserReducer,
    boardList: boardListReducer,
    match: matchReduecer,
    ui: uiReducer,
})

export default allReducers;