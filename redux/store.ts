import { configureStore,combineReducers } from '@reduxjs/toolkit';
import storage from "redux-persist/lib/storage";
import { persistStore, persistReducer } from "redux-persist";
import {toDoReducer} from './slice';

const persistConfig = {
    key: "root",
    storage,
    whitelist: ['toDo'],
}

const persistedReducer = persistReducer(
    persistConfig,
    combineReducers({
        toDo: toDoReducer
    })
)

export const store = configureStore({
    reducer: persistedReducer,
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware({
            serializableCheck: false
        }),
});

export const persistor = persistStore(store)
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;