import useUserIdStorage from "./use-user-id-storage";
import { createNewUser } from "../requests";

/**
 * Custom hook to identify device user.
 * @returns identifyUser function
 */
const useIdentifyUser = () => {
	const userIdStorage = useUserIdStorage();

	/**
	 * Function to get user id. Searches user id from device local storage
	 * and returns it if it exists. Otherwise creates new user and returns its id.
	 * @returns user id
	 */
	const identifyUser = async () => {
		const idFromStorage = await userIdStorage.getId();

		if (idFromStorage !== null) {
			console.log(`id found from storage ${idFromStorage}`);
			return idFromStorage;
		} else {
			console.log(`id not found from storage, creating new user`);
			const data = await createNewUser();
			await userIdStorage.setId(data.id);
			return data.id;
		}
	};

	return identifyUser;
};

export default useIdentifyUser;
