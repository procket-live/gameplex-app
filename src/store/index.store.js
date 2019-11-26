import AsyncStorage from '@react-native-community/async-storage';
import { createStore, applyMiddleware } from "redux";
import createSagaMiddleware from 'redux-saga';
import { persistStore, persistReducer } from 'redux-persist';
import logger from 'redux-logger';

import saga from '../saga/index.saga';
import reducer from '../reducer/index.reducer';

const persistConfig = {
    key: 'root',
    storage: AsyncStorage,
    whitelist: ['user'],
    blacklist: [],
};
const persistedReducer = persistReducer(persistConfig, reducer);

const sagaMiddleware = createSagaMiddleware();
const middlewares = [sagaMiddleware, logger];

const store = createStore(persistedReducer, applyMiddleware(...middlewares));
const persistor = persistStore(store);

sagaMiddleware.run(saga);

export default store;
export { persistor };