import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { AppDispatch } from "../store";
import { Language } from "../types";

const initialState = Language.English;

const languageSlice = createSlice({
	initialState: initialState,
	name: "language",
	reducers: {
		setLanguage(state, action: PayloadAction<Language>) {
			return action.payload;
		},
	},
});

export const { setLanguage } = languageSlice.actions;

export const changeLanguage = (newLanguage: Language) => {
	return async (dispatch: AppDispatch) => {
		console.log("Changing language to:", newLanguage);
		dispatch(setLanguage(newLanguage));
	};
};

export default languageSlice.reducer;
