import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { AppDispatch } from "../store";
import { startNewRoute, deactivateExistingRoute } from "../requests";

const routeSlice = createSlice({
	name: "route",
	initialState: null,
	reducers: {
		setRoute(state, action: PayloadAction<string>) {
			console.log(`Setting route: ${action.payload}`);
			return action.payload;
		},
	},
});

export const { setRoute } = routeSlice.actions;

/**
 * Function to start new route. Makes http request
 * to create new route and stores route ID into devices local storage.
 * @param userId
 * @returns dispatch method to update route state
 */
export const startRoute = (userId: string) => {
	return async (dispatch: AppDispatch) => {
		console.log("Starting new route");
		// Consider to clear waypoints?
		const data = await startNewRoute(userId);
		dispatch(setRoute(data.id));
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
		dispatch(setRoute(null));
		// Clear waypoints...
	};
};

export default routeSlice.reducer;
