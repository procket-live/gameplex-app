import { createStore, applyMiddleware, compose } from "redux";
import createSagaMiddleware from 'redux-saga';
import { persistStore, persistReducer, autoRehydrate } from 'redux-persist';
import logger from 'redux-logger';
import createSensitiveStorage from "redux-persist-sensitive-storage";

import saga from '../saga/index.saga';
import reducer from '../reducer/index.reducer';

const persistConfig = {
    key: 'main',
    storage: createSensitiveStorage({
        keychainService: "myKeychain",
        sharedPreferencesName: "mySharedPrefs"
    }),
    whitelist: ['user', 'mode', 'game', 'tournament'],
    blacklist: ['organizer']
};

const persistedReducer = persistReducer(persistConfig, reducer);

const sagaMiddleware = createSagaMiddleware();
const middlewares = [sagaMiddleware, logger];

const store = createStore(
    persistedReducer,
    compose(
        applyMiddleware(...middlewares),
    )
);
const persistor = persistStore(store);

sagaMiddleware.run(saga);

export default store;
export { persistor };