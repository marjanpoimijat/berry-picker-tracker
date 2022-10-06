import useUserIdStorage from "./use-user-id-storage";
import { createNewUser } from "../requests";

const useIdentifyUser = () => {
	const userIdStorage = useUserIdStorage();

	const identifyUser = async () => {
		const idFromStorage = await userIdStorage.getId();

		if (idFromStorage !== null) {
			console.log(`id found from storage ${idFromStorage}`);
		} else {
			console.log(`id not found from storage, creating new user`);
			const data = await createNewUser();
			await userIdStorage.setId(data.id);
		}
	};

	return identifyUser;
};

export default useIdentifyUser;
