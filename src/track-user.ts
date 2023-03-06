import * as Linking from "expo-linking";
import {
	secureStoreAddTracked,
	secureStoreDeleteAll,
} from "./utils/secure-store";
import { getUsersLatestRoute } from "./requests";

export const addSharedUser = async () => {
	secureStoreDeleteAll(); //tämä on poistettava kun jakotoiminnallisuus on valmis
	const url = Linking.useURL();
	if (url) {
		const { hostname, path, queryParams } = Linking.parse(url); //Parsing url for share functionality
		console.log(`${hostname} ${path} ${queryParams} `);
		if (queryParams && queryParams.userId) {
			const userId = queryParams.userId;
			const alias = queryParams.alias;
			if (typeof userId === "string") {
				const data = await getUsersLatestRoute(userId);
				if (data) {
					if (data.routeId === undefined) {
						console.log(`shared userId: ${alias} ${userId} is not found`);
						return;
					} else {
						console.log(`shared userId: ${alias} ${userId} is found`);
						await secureStoreAddTracked(userId, `${alias}`);
					}
				}
			}
		}
	}
};
