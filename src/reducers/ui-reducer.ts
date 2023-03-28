import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { AppDispatch } from "../store";

const initialState = {
	routeButtonsVisible: false,
	settingsMenuVisible: false,
	trackListVisible: false,
};

const uiSlice = createSlice({
	initialState: initialState,
	name: "ui",
	reducers: {
		setRouteButtonVisible(state, action: PayloadAction<boolean>) {
			return {
				...state,
				routeButtonsVisible: action.payload,
				trackListVisible: false,
			};
		},
		setSettingsMenuVisible(state, action: PayloadAction<boolean>) {
			return {
				...state,
				routeButtonsVisible: false,
				settingsMenuVisible: action.payload,
				trackListVisible: false,
			};
		},
		setTrackListVisible(state, action: PayloadAction<boolean>) {
			return {
				...state,
				routeButtonsVisible: false,
				settingsMenuVisible: false,
				trackListVisible: action.payload,
			};
		},
	},
});

export const { setRouteButtonVisible, setTrackListVisible, setSettingsMenuVisible } = uiSlice.actions;

export const changeTrackListVisible = (visibility: boolean) => {
	return async (dispatch: AppDispatch) => {
		dispatch(setRouteButtonVisible(visibility));
	};
};

export const changeRouteButtonVisible = (visibility: boolean) => {
	return async (dispatch: AppDispatch) => {
		dispatch(setTrackListVisible(visibility));
	};
};

export const changeSettingsMenuVisible = (visibility: boolean) => {
	return async (dispatch: AppDispatch) => {
		dispatch(setSettingsMenuVisible(visibility));
	};
};

export default uiSlice.reducer;
