import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { AppDispatch, ReduxState } from "../store";
import * as Location from "expo-location";
import * as Cellular from "expo-cellular";
import { sendNewWaypoint } from "../requests";
import { Waypoint, WaypointState } from "../types";
import {
	NetworkConnectionInformation,
	getNetworkCellularGeneration,
} from "../netinfo";

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
 * Sends waypoints to server according to the sending interval.
 * @returns dispatch method to update `WaypointState`
 */
let isOffline = false;
let sendTicker = 0;
export const storeAndSendWaypoints = () => {
	return async (dispatch: AppDispatch, getState: () => ReduxState) => {
		const routeId = getState().waypoints.routeId;
		const pendingWaypoints = getState().waypoints.pendingWaypoints;
		const sendingInterval = getState().user.sendingInterval;
		const trackingInterval = getState().user.trackingInterval;
		const location = await Location.getLastKnownPositionAsync({});
		const networkCode = await Cellular.getMobileNetworkCodeAsync();
		const netInfo = getNetworkCellularGeneration(
			await NetworkConnectionInformation()
		);
		if (routeId !== null) {
			console.log(
				`Storing wp - lat: ${location?.coords.latitude} lon: ${location?.coords.longitude} mnc: ${networkCode} conn: ${netInfo}`
			);

			if (location !== null) {
				const waypoint: Waypoint = {
					routeId: routeId,
					latitude: location.coords.latitude,
					longitude: location.coords.longitude,
					mnc: networkCode,
					connection: netInfo,
					ts: new Date().getTime(),
				};
				dispatch(appendWaypoint(waypoint));
			}
		}

		if (networkCode !== null || netInfo !== null) {
			isOffline = true;
		}

		if (
			pendingWaypoints.length >
				~~(sendingInterval / trackingInterval) + 0.5 * sendTicker ** 1.4 ||
			(isOffline && (networkCode !== null || netInfo !== null))
		) {
			const response: Response = (await sendNewWaypoint(
				pendingWaypoints
			)) as Response;
			if (response.status === 200) {
				console.log(
					`\n${pendingWaypoints.length} waypoints sent to the server`
				);
				dispatch(resetPendingWaypoints());
				isOffline = false;
				sendTicker = 0;
			} else {
				console.log("Sending waypoints to server failed");
				sendTicker++;
			}
		} else {
			console.log("No connection, not sending waypoints");
		}
	};
};

export default waypointSlice.reducer;
