import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { AppDispatch } from "../store";
import { LocationObject } from "expo-location";

const initialState = {
	coords: {
		latitude: 60.204662,
		longitude: 24.962535,
	},
};

const coordinateSlice = createSlice({
	name: "coordinate",
	initialState,
	reducers: {
		setCoordinate(state, action: PayloadAction<LocationObject>) {
			return action.payload;
		},
	},
});

export const { setCoordinate } = coordinateSlice.actions;

export const changeCoordinate = (newCoordinate: LocationObject) => {
	return async (dispatch: AppDispatch) => {
		console.log("Changing coordinate to:", newCoordinate);
		dispatch(setCoordinate(newCoordinate));
	};
};

export default coordinateSlice.reducer;
