import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { AppDispatch } from "../store";
//import { Language } from "../types";

const initialState = {
	language: 0,
};

const languageSlice = createSlice({
	name: "language",
	initialState,
	reducers: {
		setLanguage(state, action: PayloadAction<number>) {
			return { ...state, language: action.payload };
		},
	},
});

export const { setLanguage } = languageSlice.actions;

export const changeLanguage = (newLanguage: number) => {
	return async (dispatch: AppDispatch) => {
		console.log("Changing language to: ", newLanguage);
		dispatch(setLanguage(newLanguage));
	};
};

export default languageSlice.reducer;
