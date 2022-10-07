import useUserIdStorage from "./use-user-id-storage";
import { createNewUser } from "../requests";

/**
 * Custom hook to identify device user.
 * @returns identifyUser function
 */
const useIdentifyUser = () => {
	const userIdStorage = useUserIdStorage();

	/**
	 * Function to get user id. Searches user-id from devices local storage
	 * and returns it if exists. Otherwise creates new user using http request.
	 * @returns user id
	 */
	const identifyUser = async () => {
		console.log("Identifying user...");
		const idFromStorage = await userIdStorage.getId();

		// Should we also consider situation when user ID has stored into local storage
		// but it has been removed from the server??
		if (idFromStorage !== null) {
			console.log(`user id found from storage ${idFromStorage}`);
			return idFromStorage;
		} else {
			console.log(`user id not found from storage, creating new user`);
			const data = await createNewUser();
			await userIdStorage.setId(data.id);
			return data.id;
		}
	};

	return identifyUser;
};

export default useIdentifyUser;
