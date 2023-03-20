import * as Linking from "expo-linking";
import { secureStoreAddTracked } from "./utils/secure-store";
import { getUsersLatestRoute } from "./requests";

export const addSharedUser = async () => {
	const url = Linking.useURL();
	if (!url) {
		return;
	}
	const { queryParams } = Linking.parse(url);
	if (!queryParams || !queryParams.userId) {
		return;
	}
	const { userId, username } = queryParams;
	if (typeof userId !== "string") {
		return;
	}
	const data = await getUsersLatestRoute(userId);
	if (!data || data.routeId === undefined) {
		console.log(`shared userId: ${username} ${userId} is not found`);
		return;
	}
	console.log(`shared userId: ${username} ${userId} is found`);
	await secureStoreAddTracked(userId, `${username}`);
};
