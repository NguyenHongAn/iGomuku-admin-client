import {combineReducers} from 'redux';
import listOnlUserReducer from './listOnlUserReducer';
import authReducer from './authReducer';
import socketReducer from './socketReducer';
import boardListReducer from './boardListReducer';
import matchReduecer from './matchReducer';
import uiReducer from './uiReducer';
import adminReducer from './adminReducer';

//combine các reducer lại với nhau 
const allReducers = combineReducers({
    socket: socketReducer,
    auth: authReducer,
    onlineUsers: listOnlUserReducer,
    boardList: boardListReducer,
    match: matchReduecer,
    ui: uiReducer,
    admin: adminReducer,
})

export default allReducers;