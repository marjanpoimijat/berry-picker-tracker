import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { AppDispatch } from "../store";
import { Map } from "../../types";

const initialState = Map.nlsTopographic;

const mapSlice = createSlice({
	initialState: initialState,
	name: "map",
	reducers: {
		setMap(state, action: PayloadAction<Map>) {
			return action.payload;
		},
	},
});

export const { setMap } = mapSlice.actions;

export const changeMap = (newMap: Map) => {
	return async (dispatch: AppDispatch) => {
		console.log("Changing map to:", newMap);
		dispatch(setMap(newMap));
	};
};

export default mapSlice.reducer;
