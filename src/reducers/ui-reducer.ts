import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { AppDispatch } from "../store";

interface uiOptions {
	routeButtonsVisible: boolean;
}

const initialState = {
	routeButtonsVisible: false,
};

const uiSlice = createSlice({
	name: "ui",
	initialState,
	reducers: {
		setUi(state, action: PayloadAction<uiOptions>) {
			return action.payload;
		},
	},
});

export const { setUi } = uiSlice.actions;

export const changeUi = (newUi: uiOptions) => {
	return async (dispatch: AppDispatch) => {
		console.log("Changing ui to:", newUi);
		dispatch(setUi(newUi));
	};
};

export default uiSlice.reducer;
