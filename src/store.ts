import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { persistReducer, persistStore } from "redux-persist";
import { AnyAction } from "redux";
import thunk, { ThunkAction, ThunkDispatch } from "redux-thunk";

import rootReducer from "./reducers/root-reducer";

const persistConfig = {
	key: "root",
	storage: AsyncStorage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
	reducer: persistedReducer,
	middleware: [thunk],
});

export const persistor = persistStore(store);

export type AppDispatch = typeof store.dispatch;
export type ReduxState = ReturnType<typeof rootReducer>;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type TypedDispatch = ThunkDispatch<ReduxState, any, AnyAction>;
export type TypedThunk<ReturnType = void> = ThunkAction<
	ReturnType,
	ReduxState,
	unknown,
	AnyAction
>;
export const useTypedDispatch = () => useDispatch<TypedDispatch>();
export const useTypedSelector: TypedUseSelectorHook<ReduxState> = useSelector;
