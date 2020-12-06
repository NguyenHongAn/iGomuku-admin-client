import {applyMiddleware, createStore, compose} from 'redux';
import thunk from 'redux-thunk';
import allReducers from './reducers/index';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

//tạo store chính từ các reducer đã combine
//input: reducers chính, middleware thun
//output: store
const store = createStore(allReducers, 
    composeEnhancers(applyMiddleware(thunk))
    )


export default store;