import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { AppDispatch, ReduxState } from "../store";
import { startNewRoute, deactivateExistingRoute } from "../requests";
import { Route, User } from "../types";
import { setRouteId, initializeWaypoints } from "./waypoint-reducer";
import {
	startBackgroundUpdate,
	stopBackgroundUpdate,
} from "../utils/location-tracking";

const initialState: Route = {
	routeId: null,
	showRoute: true,
	active: false,
};

const routeSlice = createSlice({
	name: "route",
	initialState,
	reducers: {
		setRoute(_state, action: PayloadAction<Route>) {
			console.log(`Setting route: ${action.payload.routeId}`);
			return action.payload;
		},
		changeVisibility(state, action: PayloadAction<boolean>) {
			return {
				...state,
				showRoute: action.payload,
			};
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
				routeId: data.id,
				showRoute: true,
				active: true,
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
 * makes http request to deactivate active route, initializes route state
 * and stops background location tracking.
 * Route object `active`param will be se to false.
 * @param routeId
 * @returns dispatch method to reset route state
 */
export const deactivateRoute = () => {
	return async (dispatch: AppDispatch, getState: () => ReduxState) => {
		const routeId = getState().route.routeId;
		if (routeId !== null) {
			console.log(`\nDeactivating route with id: ${routeId}`);
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

export default routeSlice.reducer;