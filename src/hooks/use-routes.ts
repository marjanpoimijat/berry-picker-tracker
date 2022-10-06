import { startNewRoute, deactivateExistingRoute } from "../requests";
import useRouteIdStorage from "./use-route-id-storage";

//Incomplete, just for testing
const useRoutes = () => {
	const routeIdStorage = useRouteIdStorage();

	const startRoute = async (userId: string) => {
		//This logic needs to be changed...
		const routeFromStorage = await routeIdStorage.getId();

		if (routeFromStorage !== null) {
			console.log(`id found from storage ${routeFromStorage}`);
			return routeFromStorage;
		} else {
			console.log(`id not found from storage, creating new user`);
			const data = await startNewRoute(userId);
			await routeIdStorage.setId(data.id);
			return data.id;
		}
	};

	const deactivateRoute = async (routeId: string) => {
		await deactivateExistingRoute(routeId);
		await routeIdStorage.removeId();
	};

	return { startRoute, deactivateRoute };
};

export default useRoutes;
