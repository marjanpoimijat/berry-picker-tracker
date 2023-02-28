import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { AppDispatch } from "../store";

const initialState = {
	routeButtonsVisible: false,
	trackListVisible: false,
};

const uiSlice = createSlice({
	name: "ui",
	initialState,
	reducers: {
		setTrackListVisible(state, action: PayloadAction<boolean>) {
			return {
				...state,
				routeButtonsVisible: false,
				trackListVisible: action.payload,
			};
		},
		setRouteButtonVisible(state, action: PayloadAction<boolean>) {
			return {
				...state,
				routeButtonsVisible: action.payload,
				trackListVisible: false,
			};
		},
	},
});

export const { setRouteButtonVisible, setTrackListVisible } = uiSlice.actions;

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

export default uiSlice.reducer;
