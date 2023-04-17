import * as Linking from "expo-linking";
import { increment } from "./reducers/id-reducer";
import { addTrackedUser } from "./reducers/tracker-users-reducer";
import { getUsersLatestRoute } from "./requests";
import { store } from "./store";
import { secureStoreAddTracked } from "./utils/secure-store";

export const addSharedUser = async () => {
	const url = Linking.useURL();
	if (!url) {
		return;
	}
	const { queryParams } = Linking.parse(url);
	if (!queryParams || !queryParams.userId) {
		return;
	}
	const { cryptoKey, userId, username } = queryParams;
	if (typeof userId !== "string") {
		return;
	}
	if (typeof username !== "string") {
		return;
	}
	if (typeof cryptoKey !== "string") {
		return;
	}
	await secureStoreAddTracked(userId, cryptoKey);
	const data = await getUsersLatestRoute(userId);
	if (!data || data.routeId === undefined) {
		console.log(`shared userId: ${userId} is not found`);
		return;
	}
	console.log(`shared userId: ${userId} is found`);
	const id = store.getState().id;
	const trackedObject = {
		id: id,
		locationVisible: true,
		routeVisible: true,
		userId: userId,
		username: username,
	};
	store.dispatch(increment());
	store.dispatch(addTrackedUser(trackedObject));
};
