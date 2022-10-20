import {
	startNewRoute,
	sendNewWaypoint,
	deactivateExistingRoute,
} from "../requests";
import useRouteIdStorage from "./use-route-id-storage";
import useWaypointStorage from "./use-waypoint-storage";

/**
 * Custom hook to use route operations.
 * @returns startRoute and deactivateRoute functions
 */
const useRoutes = () => {
	const routeIdStorage = useRouteIdStorage();
	const waypointStorage = useWaypointStorage();

	/**
	 * Function to start new route. Makes http request
	 * to create new route and stores route ID into devices local storage.
	 * @returns route id
	 */
	const startRoute = async (userId: string) => {
		console.log("Starting new route");
		await waypointStorage.clearWaypoints(); // just because currently route can be ended without deactivation
		const data = await startNewRoute(userId);
		await routeIdStorage.setId(data.id);
		return data.id;
	};

	/**
	 * Function to add new waypoints to current route. Makes http request
	 * to add location and mnc-code to given routeId and stores waypoint into local device.
	 * @returns request response
	 */
	const sendWaypoint = async (waypointList) => {
		const data = await sendNewWaypoint(waypointList);
		await waypointStorage.addWaypoint(waypointList);
		return data;
	};

	/**
	 * Function to deactivate route. Makes http request
	 * to deactivate active route and removes route ID and waypoints from devices local storage.
	 */
	const deactivateRoute = async () => {
		console.log("Deactivating route");
		const routeId = await routeIdStorage.getId();
		await deactivateExistingRoute(routeId);
		await routeIdStorage.removeId();
		await waypointStorage.clearWaypoints();
	};

	return { startRoute, sendWaypoint, deactivateRoute };
};

export default useRoutes;
