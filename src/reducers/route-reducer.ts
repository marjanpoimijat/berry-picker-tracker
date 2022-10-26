import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { AppDispatch } from "../store";
import { startNewRoute, deactivateExistingRoute } from "../requests";

interface Route {
	routeId: string;
	showRoute: boolean;
	active: boolean;
}

const initialState: Route = {
	routeId: null,
	showRoute: true,
	active: false,
};

const routeSlice = createSlice({
	name: "route",
	initialState,
	reducers: {
		setRoute(state, action: PayloadAction<Route>) {
			console.log(`Setting route: ${action.payload.routeId}`);
			return action.payload;
		},
	},
});

export const { setRoute } = routeSlice.actions;

/**
 * Function to start new route. Makes http request
 * to create new route and stores route object into devices local storage.
 * @param userId
 * @returns dispatch method to update route state
 */
export const startRoute = (userId: string) => {
	return async (dispatch: AppDispatch) => {
		console.log("Starting new route");
		// Consider to clear waypoints?
		const data = await startNewRoute(userId);
		const updatedRoute = {
			routeId: data.id,
			showRoute: true,
			active: true,
		};
		dispatch(setRoute(updatedRoute));
	};
};

/**
 * Function to deactivate route. Makes http request
 * to deactivate active route and removes route ID and waypoints from devices local storage.
 * @param routeId
 * @returns dispatch method to reset route state
 */
export const deactivateRoute = (routeId: string) => {
	return async (dispatch: AppDispatch) => {
		console.log(`Deactivating route with id: ${routeId}`);
		await deactivateExistingRoute(routeId);
		dispatch(setRoute(initialState));
	};
};

export const changeShowRoute = (routeObject: Route) => {
	return async (dispatch: AppDispatch) => {
		console.log(`route visibility set to ${!routeObject.showRoute}`);
		const updatedRoute = {
			...routeObject,
			showRoute: !routeObject.showRoute,
		};
		dispatch(setRoute(updatedRoute));
	};
};

export default routeSlice.reducer;
