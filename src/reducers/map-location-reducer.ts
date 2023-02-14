import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { AppDispatch } from "../store";

interface MapLocation {
	coords: {
		latitude: number;
		longitude: number;
		latitudeDelta: number;
		longitudeDelta: number;
	};
}

const initialState = {
	coords: {
		latitude: 60.204662,
		longitude: 24.962535,
		latitudeDelta: 0.01,
		longitudeDelta: 0.01,
	},
};

const locationSlice = createSlice({
	name: "location",
	initialState,
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
