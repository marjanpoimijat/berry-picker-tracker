import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { AppDispatch } from "../store";
import * as Location from "expo-location";
import * as Cellular from "expo-cellular";
import { sendNewWaypoint } from "../requests";
import { LocationObject } from "expo-location";

interface Waypoint {
	routeId: string;
	location: LocationObject;
	mnc: string | null;
}

const initialState: Array<Waypoint> = [];

const waypointSlice = createSlice({
	name: "waypoints",
	initialState,
	reducers: {
		setWaypoints(state, action: PayloadAction<Array<Waypoint>>) {
			console.log(`Setting waypoints`);
			return action.payload;
		},
		appendWaypoint(state, action: PayloadAction<Waypoint>) {
			state.push(action.payload);
		},
	},
});

export const { setWaypoints, appendWaypoint } = waypointSlice.actions;

export const storeWaypoint = (routeId: string) => {
	return async (dispatch: AppDispatch) => {
		console.log(`Storing new waypoint with route ID: ${routeId}`);
		const location = await Location.getLastKnownPositionAsync({});
		const networkCode = await Cellular.getMobileNetworkCodeAsync();

		if (location !== null) {
			const waypoint: Waypoint = {
				routeId: routeId,
				location: location,
				mnc: networkCode,
			};
			await sendNewWaypoint([waypoint]);
			dispatch(appendWaypoint(waypoint));
		}
	};
};

export const resetWaypoints = () => {
	return async (dispatch: AppDispatch) => {
		console.log("Reseting stored waypoints");
		dispatch(setWaypoints(initialState));
	};
};

export default waypointSlice.reducer;
