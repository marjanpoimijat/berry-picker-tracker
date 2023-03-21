import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { AppDispatch, ReduxState } from "../store";
import * as Location from "expo-location";
import * as Cellular from "expo-cellular";
import { sendNewWaypoint } from "../requests";
import { Waypoint, WaypointState } from "../types";
import { NetworkConnectionInformation, getNetworkCellularGeneration } from "../netinfo";

const initialState: WaypointState = {
	localWaypoints: [],
	pendingWaypoints: [],
	routeId: null,
};

const waypointSlice = createSlice({
	initialState: initialState,
	name: "waypoints",
	reducers: {
		appendWaypoint(state, action: PayloadAction<Waypoint>) {
			return {
				...state,
				localWaypoints: state.localWaypoints.concat(action.payload),
				pendingWaypoints: state.pendingWaypoints.concat(action.payload),
			};
		},
		initializeWaypoints() {
			console.log(`Reseting waypoints`);
			return initialState;
		},
		resetPendingWaypoints(state) {
			console.log("reseting pending waypoints\n");
			return { ...state, pendingWaypoints: [] };
		},
		setRouteId(state, action: PayloadAction<string | null>) {
			console.log(`setting waypointState route ID to ${action.payload}`);
			return {
				...state,
				routeId: action.payload,
			};
		},
	},
});

export const { initializeWaypoints, setRouteId, appendWaypoint, resetPendingWaypoints } = waypointSlice.actions;

let wasOffline = false;
let sendTicker = 0;
/**
 * Checks wheter route ID has been initialized. If so, gets location and MNC code and creates
 * a new waypoint object which will stored into localdevices `WaypointState`
 * Sends waypoints to server according to the sending interval or immediately if
 * was disconnected and is connected.
 * @returns dispatch method to update `WaypointState`
 */
export const storeAndSendWaypoints = () => {
	return async (dispatch: AppDispatch, getState: () => ReduxState) => {
		const routeId = getState().waypoints.routeId;
		const pendingWaypoints = getState().waypoints.pendingWaypoints;
		const sendingInterval = getState().user.sendingInterval;
		const trackingInterval = getState().user.trackingInterval;
		const location = await Location.getLastKnownPositionAsync({});
		const networkCode = await Cellular.getMobileNetworkCodeAsync();
		const netInfo = getNetworkCellularGeneration(await NetworkConnectionInformation());
		const isConnected = (await NetworkConnectionInformation()).isConnected;
		if (routeId !== null) {
			console.log(`Storing wp - lat: ${location?.coords.latitude}`);
			console.log(`lon: ${location?.coords.longitude} mnc: ${networkCode} conn: ${netInfo}`);

			if (location !== null) {
				const waypoint: Waypoint = {
					connection: netInfo,
					latitude: location.coords.latitude,
					longitude: location.coords.longitude,
					mnc: networkCode,
					routeId: routeId,
					ts: new Date().getTime(),
				};
				dispatch(appendWaypoint(waypoint));
			}
		}

		if (
			isConnected &&
			(pendingWaypoints.length > ~~(sendingInterval / trackingInterval) + 0.5 * sendTicker ** 1.4 || wasOffline)
		) {
			const response: Response = (await sendNewWaypoint(pendingWaypoints)) as Response;
			if (response.status === 200) {
				console.log(`\n${pendingWaypoints.length} waypoints sent to the server`);
				dispatch(resetPendingWaypoints());
				sendTicker = 0;
			} else {
				console.log("Sending waypoints to server failed");
				sendTicker++;
			}
		}
		wasOffline = !isConnected;
	};
};

export default waypointSlice.reducer;
