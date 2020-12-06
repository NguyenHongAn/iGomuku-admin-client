import {combineReducers} from 'redux';
import socketReducer from './socketReducer';

//combine các reduer lại với nhau 
const allReducers = combineReducers({
   socketReducer,
})

export default allReducers;