import { startNewRoute, deactivateExistingRoute } from "../requests";
import useRouteIdStorage from "./use-route-id-storage";

/**
 * Custom hook to use route operations.
 * @returns startRoute and deactivateRoute functions
 */
const useRoutes = () => {
	const routeIdStorage = useRouteIdStorage();

	/**
	 * Function to start new route. Makes http request
	 * to create new route and stores route ID into devices local storage.
	 * @returns route id
	 */
	const startRoute = async (userId: string) => {
		console.log("Starting new route");
		const data = await startNewRoute(userId);
		await routeIdStorage.setId(data.id);
		return data.id;
	};

	/**
	 * Function to deactivate route. Makes http request
	 * to deactivate active route and removes route ID from devices local storage.
	 */
	const deactivateRoute = async () => {
		console.log("Deactivating route");
		const routeId = await routeIdStorage.getId();
		await deactivateExistingRoute(routeId);
		await routeIdStorage.removeId();
	};

	return { startRoute, deactivateRoute };
};

export default useRoutes;
