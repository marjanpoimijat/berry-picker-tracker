import * as Linking from "expo-linking";
import {
	secureStoreAddTracked,
	secureStoreDeleteAll,
} from "./utils/secure-store";
import { getUsersLatestRoute } from "./requests";

export const addSharedUser = async () => {
	secureStoreDeleteAll(); // remove this when sharing functionality is complete
	const url = Linking.useURL();
	if (!url) {
		return;
	}
	const { queryParams } = Linking.parse(url);
	if (!queryParams || !queryParams.userId) {
		return;
	}
	const { userId, alias } = queryParams;
	if (typeof userId !== "string") {
		return;
	}
	const data = await getUsersLatestRoute(userId);
	if (!data || data.routeId === undefined) {
		console.log(`shared userId: ${alias} ${userId} is not found`);
		return;
	}
	console.log(`shared userId: ${alias} ${userId} is found`);
	await secureStoreAddTracked(userId, `${alias}`);
};
