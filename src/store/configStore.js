import {applyMiddleware, createStore,compose } from 'redux';
import thunk from 'redux-thunk';
import allReducers from './reducers/index';
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage';
import { createTransform } from 'redux-persist';
import * as Flatted from 'flatted';
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// // sửa lỗi error serializing state
export const transformCircular = createTransform(
    (inboundState, key) => Flatted.stringify(inboundState),
    (outboundState, key) => Flatted.parse(outboundState),
)

const persistConfig = {
    key: "igomoku",
    storage,
    transforms: [transformCircular],
              // các state không được lưu trong localStorage
}



//tạo store chính từ các reducer đã combine
//dùng redux-persisit để luu các state lại trong localStore
//input: reducers chính, middleware thun
//output: store

const persistedReducer  = persistReducer(persistConfig, allReducers); 

const store = createStore(persistedReducer, composeEnhancers(applyMiddleware(thunk)));
const persistor = persistStore(store);

export default {
        store,
        persistor,
};

// const store = createStore(allReducers, composeEnhancers(applyMiddleware(thunk)));

// export default store;
