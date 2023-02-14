import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { AppDispatch } from "../store";
import { LocationObject } from "expo-location";

const initialState = {
	coords: {
		latitude: 60.204662,
		longitude: 24.962535,
	},
};

const locationSlice = createSlice({
	name: "location",
	initialState,
	reducers: {
		setLocation(state, action: PayloadAction<LocationObject>) {
			return action.payload;
		},
	},
});

export const { setLocation } = locationSlice.actions;

export const changeLocation = (newLocation: LocationObject) => {
	return async (dispatch: AppDispatch) => {
		console.log("Changing location to:", newLocation);
		dispatch(setLocation(newLocation));
	};
};

export default locationSlice.reducer;
