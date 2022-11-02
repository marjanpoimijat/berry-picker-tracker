import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { AppDispatch } from "../store";
import * as Location from "expo-location";
import * as Cellular from "expo-cellular";
import { sendNewWaypoint } from "../requests";
import { Waypoint, WaypointState } from "../types";

const initialState: WaypointState = {
	localWaypoints: [],
	pendingWaypoints: [],
};

const waypointSlice = createSlice({
	name: "waypoints",
	initialState,
	reducers: {
		setWaypoints(state, action: PayloadAction<WaypointState>) {
			console.log(`Setting waypoints`);
			return action.payload;
		},
		appendWaypoint(state, action: PayloadAction<Waypoint>) {
			return {
				localWaypoints: state.localWaypoints.concat(action.payload),
				pendingWaypoints: state.pendingWaypoints.concat(action.payload),
			};
		},
		resetPendingWaypoints(state) {
			console.log("reseting pending waypoints");
			return { ...state, pendingWaypoints: [] };
		},
	},
});

export const { setWaypoints, appendWaypoint, resetPendingWaypoints } =
	waypointSlice.actions;

/**
 * Gets location and MNC code and creates a new waypoint object
 * which will stored into localdevices `WaypointState`
 * @param routeId
 * @returns dispatch method to update `WaypointState`
 */
export const storeWaypoint = (routeId: string | null) => {
	return async (dispatch: AppDispatch) => {
		if (routeId !== null) {
			console.log(`Storing new waypoint...`);
			const location = await Location.getLastKnownPositionAsync({});
			const networkCode = await Cellular.getMobileNetworkCodeAsync();

			if (location !== null) {
				const waypoint: Waypoint = {
					routeId: routeId,
					latitude: location.coords.latitude,
					longitude: location.coords.longitude,
					mnc: networkCode,
					ts: new Date().getTime(),
				};
				dispatch(appendWaypoint(waypoint));
			}
		}
	};
};

/**
 * Recieves list of pending waypoints and send them into the server.
 * After that the pending waypoint state will be reseted.
 * @param pendingWaypoints
 * @returns dispatch method to send and reset pending waypoints
 */
export const sendPendingWaypoints = (pendingWaypoints: Array<Waypoint>) => {
	return async (dispatch: AppDispatch) => {
		console.log(`${pendingWaypoints.length} waypoints send to the server`);
		await sendNewWaypoint(pendingWaypoints);
		dispatch(resetPendingWaypoints());
	};
};

/**
 * Initializes local and pending waypoints lists with empty lists.
 * @returns dispatch method to initialize `WaypointState`
 */
export const resetWaypoints = () => {
	return async (dispatch: AppDispatch) => {
		console.log("Reseting stored waypoints");
		dispatch(setWaypoints(initialState));
	};
};

export default waypointSlice.reducer;
