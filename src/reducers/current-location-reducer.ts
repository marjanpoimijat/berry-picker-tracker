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
	name: "currentLocation",
	initialState,
	reducers: {
		setCurrentLocation(state, action: PayloadAction<LocationObject>) {
			return action.payload;
		},
	},
});

export const { setCurrentLocation } = locationSlice.actions;

export const changeCurrentLocation = (newLocation: LocationObject) => {
	return async (dispatch: AppDispatch) => {
		console.log("Changing location to:", newLocation);
		dispatch(setCurrentLocation(newLocation));
	};
};

export default locationSlice.reducer;
