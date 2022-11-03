import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { AppDispatch, ReduxState } from "../store";
import * as Location from "expo-location";
import * as Cellular from "expo-cellular";
import { sendNewWaypoint } from "../requests";
import { Waypoint, WaypointState } from "../types";

const initialState: WaypointState = {
	routeId: null,
	localWaypoints: [],
	pendingWaypoints: [],
};

const waypointSlice = createSlice({
	name: "waypoints",
	initialState,
	reducers: {
		initializeWaypoints() {
			console.log(`Reseting waypoints`);
			return initialState;
		},
		setRouteId(state, action: PayloadAction<string | null>) {
			console.log(`setting waypointState route ID to ${action.payload}`);
			return {
				...state,
				routeId: action.payload,
			};
		},
		appendWaypoint(state, action: PayloadAction<Waypoint>) {
			return {
				...state,
				localWaypoints: state.localWaypoints.concat(action.payload),
				pendingWaypoints: state.pendingWaypoints.concat(action.payload),
			};
		},
		resetPendingWaypoints(state) {
			console.log("reseting pending waypoints\n");
			return { ...state, pendingWaypoints: [] };
		},
	},
});

export const {
	initializeWaypoints,
	setRouteId,
	appendWaypoint,
	resetPendingWaypoints,
} = waypointSlice.actions;

/**
 * Checks wheter route ID has been initialized. If so, gets location and MNC code and creates
 * a new waypoint object which will stored into localdevices `WaypointState`
 * Sends also waypoints to the server, if there are more than 5 pending waypoints
 * @returns dispatch method to update `WaypointState`
 */
export const storeAndSendWaypoints = () => {
	return async (dispatch: AppDispatch, getState: () => ReduxState) => {
		const routeId = getState().waypoints.routeId;
		const pendingWaypoints = getState().waypoints.pendingWaypoints;
		if (routeId !== null) {
			const location = await Location.getLastKnownPositionAsync({});
			const networkCode = await Cellular.getMobileNetworkCodeAsync();
			console.log(
				`Storing wp - lat: ${location?.coords.latitude} lon: ${location?.coords.longitude} mnc: ${networkCode}`
			);

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
		if (pendingWaypoints.length > 5) {
			console.log(`\n${pendingWaypoints.length} waypoints send to the server`);
			await sendNewWaypoint(pendingWaypoints);
			dispatch(resetPendingWaypoints());
		}
	};
};

export default waypointSlice.reducer;
