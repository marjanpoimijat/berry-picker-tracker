import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { MapLocation } from "../types";
import type { AppDispatch } from "../store";

const initialState = {
	coords: {
		latitude: 60.204662,
		latitudeDelta: 0.01,
		longitude: 24.962535,
		longitudeDelta: 0.01,
	},
};

const locationSlice = createSlice({
	initialState: initialState,
	name: "location",
	reducers: {
		setMapLocation(state, action: PayloadAction<MapLocation>) {
			return action.payload;
		},
	},
});

export const { setMapLocation } = locationSlice.actions;

export const changeMapLocation = (newLocation: MapLocation) => {
	return async (dispatch: AppDispatch) => {
		console.log("Changing location to:", newLocation);
		dispatch(setMapLocation(newLocation));
	};
};

export default locationSlice.reducer;
