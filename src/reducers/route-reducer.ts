import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppDispatch, ReduxState } from "../store";
import {
	startNewRoute,
	deactivateExistingRoute,
	sendNewWaypoint,
} from "../requests";
import { Route, User } from "../types";
import { setRouteId, initializeWaypoints } from "./waypoint-reducer";
import {
	startBackgroundUpdate,
	stopBackgroundUpdate,
} from "../utils/location-tracking";
import { Share } from "react-native";
import * as Linking from "expo-linking";

const initialState: Route = {
	active: false,
	routeId: null,
	showRoute: true,
};

const routeSlice = createSlice({
	initialState: initialState,
	name: "route",
	reducers: {
		changeVisibility(state, action: PayloadAction<boolean>) {
			return {
				...state,
				showRoute: action.payload,
			};
		},
		setRoute(_state, action: PayloadAction<Route>) {
			console.log(`Setting route: ${action.payload.routeId}`);
			return action.payload;
		},
	},
});

export const { setRoute, changeVisibility } = routeSlice.actions;

/**
 * Function to start new route. Validates that user ID is not null and makes http request
 * to create new route, store new route object into the devices storage and start background
 * location tracking.
 * Route object `showRoute` and `active` params will be se to true.
 * @param user user object which contains id and interval parameters.
 * @returns dispatch method to update route state
 */
export const startRoute = (user: User) => {
	return async (dispatch: AppDispatch) => {
		if (user.userId !== null) {
			console.log("Starting a new route...");
			const data = await startNewRoute(user.userId);
			//TODO: Validate data and create local id if request fails...?
			const updatedRoute = {
				active: true,
				routeId: data.id,
				showRoute: true,
			};
			dispatch(setRoute(updatedRoute));
			dispatch(setRouteId(data.id));
			startBackgroundUpdate(user.trackingInterval);
			console.log(" ");
		}
	};
};

/**
 * Function to deactivate route. Validates that user ID is not null and
 * makes http request to send last waypoints, deactivate active route,
 * initializes route state and stops background location tracking.
 * Route object `active`param will be se to false.
 * @returns dispatch method to reset route state
 */
export const deactivateRoute = () => {
	return async (dispatch: AppDispatch, getState: () => ReduxState) => {
		const routeId = getState().route.routeId;
		const pendingWaypoints = getState().waypoints.pendingWaypoints;
		if (routeId !== null) {
			console.log(`\nDeactivating route with id: ${routeId}`);
			await sendNewWaypoint(pendingWaypoints);
			await deactivateExistingRoute(routeId);
			dispatch(setRoute(initialState));
			dispatch(initializeWaypoints());
			stopBackgroundUpdate();
			console.log(" ");
		}
	};
};

/**
 * Function to change show route status to opposite boolean.
 * @returns dispatch method to change route show route
 */
export const changeShowRoute = () => {
	return async (dispatch: AppDispatch, getState: () => ReduxState) => {
		const showRoute = getState().route.showRoute;
		console.log(`\nroute visibility set to ${!showRoute}\n`);
		dispatch(changeVisibility(!showRoute));
	};
};

export const shareRoute = (user: User) => {
	const redirectUrl = Linking.createURL("/", {
		queryParams: { userId: `${user.userId}` },
	});
	return async () => {
		await Share.share({
			message: redirectUrl,
		});
	};
};

export default routeSlice.reducer;
