import * as SecureStore from "expo-secure-store";
import { addTrackedUser } from "../reducers/tracker-users-reducer";

/**
 * SecureStore is used to store tracked users' information
 * in a single JSON object named "tracked". SecureStore also stores the user's
 * crypto key which is used to encrypt and decrypt sent data.
 *
 * example JSON object:
 *
tracked: {
	Y0QsWBzUwP89: {
		id: 1,
		locationVisible: true,
		routeVisible: true,
		userId: 'Y0QsWBzUwP89',
		username: Jorma,
	},
	W9RZL7VXJ3FK: {
		id: 2,
		locationVisible: true,
		routeVisible: false,
		userId: 'W9RZL7VXJ3FK',
		username: Seppo,
	},
}
 *
 * example cryptokey object:
 *
"cryptoKey": "sd9fk3+f0sdf3"
 */

import { store } from "../store";

export const secureStoreAddTracked = async (userId: string, username: string) => {
	console.log("secureStoreAddTracked()");
	try {
		const objectExists = await secureStoreGetTrackedObject();
		if (!objectExists) {
			await secureStoreInitializeTrackedObject();
		}
		const userList = await secureStoreGetAllTrackedUsers();
		if (userList && userList.includes(userId)) {
			return;
		}
		const tracked = await SecureStore.getItemAsync("tracked");
		if (tracked) {
			const trackedJson = JSON.parse(tracked);
			const trackedObject = {
				id: 1,
				locationVisible: true,
				routeVisible: true,
				userId: userId,
				username: username,
			};
			store.dispatch(addTrackedUser(trackedObject));
			trackedJson[userId] = trackedObject;
			const newTracked = JSON.stringify(trackedJson);
			await SecureStore.setItemAsync("tracked", newTracked);
			console.log(`Storage updated: ${newTracked}`);
		}
	} catch (error) {
		console.log(`Failed to save key "${userId}". Error: ${error}`);
	}
};

export const secureStoreGetTrackedUser = async (key: string) => {
	console.log("secureStoreGetTrackedUser()");
	try {
		const tracked = await SecureStore.getItemAsync("tracked");
		if (tracked) {
			const trackedJson = JSON.parse(tracked);
			const value = trackedJson[key];
			if (value) {
				console.log(value);
				return value;
			} else {
				console.log("No values stored under that key.");
			}
		} else {
			console.log('"Tracked" object not found.');
		}
	} catch (error) {
		console.log(`Failed to get user "${key}". Error: ${error}`);
	}
};

export const secureStoreUpdateTrackedUser = async (userId: string, location: boolean, route: boolean) => {
	console.log("secureStoreUpdateTrackedUser()");
	try {
		const tracked = await SecureStore.getItemAsync("tracked");
		if (!tracked) {
			console.log("Tracked object not found");
			return;
		}
		const trackedJson = JSON.parse(tracked);
		// eslint-disable-next-line no-prototype-builtins
		if (!trackedJson.hasOwnProperty(userId)) {
			console.log(`User "${userId}" not found.`);
			return;
		}
		trackedJson[userId].locationVisible = location;
		trackedJson[userId].routeVisible = route;
		const newTracked = JSON.stringify(trackedJson);
		await SecureStore.setItemAsync("tracked", newTracked);
		console.log(`Storage updated: ${newTracked}`);
	} catch (error) {
		console.log(`Failed to flip routeVisible for user "${userId}". Error: ${error}`);
	}
};

export const secureStoreDeleteTrackedUser = async (key: string) => {
	console.log("secureStoreDeleteTrackedUser()");
	try {
		const tracked = await SecureStore.getItemAsync("tracked");
		if (tracked) {
			const trackedJson = JSON.parse(tracked);
			delete trackedJson[key];
			const newTracked = JSON.stringify(trackedJson);
			await SecureStore.setItemAsync("tracked", newTracked);
			console.log(`Key "${key}" deleted successfully.`);
		} else {
			console.log('"tracked" object not found.');
		}
	} catch (error) {
		console.log(`Failed to delete key "${key}". Error: ${error}`);
	}
};

export const secureStoreInitializeTrackedObject = async () => {
	console.log("secureStoreInitializeTrackedObject()");
	try {
		await SecureStore.setItemAsync("tracked", "{}");
		console.log('Initialized "tracked" object.');
	} catch (error) {
		console.log(`Failed to initialize "tracked" object. Error: ${error}`);
	}
};

export const secureStoreGetAllTrackedUsers = async () => {
	console.log("secureStoreGetAllTrackedUsers()");
	try {
		const tracked = await SecureStore.getItemAsync("tracked");
		if (tracked) return tracked;
	} catch (error) {
		console.log(`Failed to get all users. Error: ${error}`);
	}
};

export const secureStoreDeleteTrackedObject = async () => {
	console.log("secureStoreDeleteTrackedObject()");
	try {
		const result = await SecureStore.getItemAsync("tracked");
		if (result) {
			await SecureStore.deleteItemAsync("tracked");
		}
		console.log('Deleted "tracked" object.');
	} catch (error) {
		console.log(`Failed to delete "tracked" object. Error: ${error}`);
	}
};

export const secureStoreGetTrackedObject = async () => {
	console.log("secureStoreGetTrackedObject()");
	try {
		const tracked = await SecureStore.getItemAsync("tracked");
		return tracked;
	} catch (error) {
		console.log(`Failed to check whether "tracked" object exists. Error: ${error}`);
	}
};

export const secureStoreAddCryptoKey = async (key: string) => {
	try {
		await SecureStore.setItemAsync("cryptoKey", key);
		console.log("Crypto key updated.");
	} catch (error) {
		console.log(`Failed to save crypto key. Error: ${error}`);
	}
};

export const secureStoreGetCryptoKey = async () => {
	try {
		const cryptoKey = await SecureStore.getItemAsync("cryptoKey");
		return cryptoKey;
	} catch (error) {
		console.log(`Failed to get crypto key. Error: ${error}`);
	}
};

export const secureStoreDeleteCryptoKey = async () => {
	try {
		const result = await SecureStore.getItemAsync("cryptoKey");
		if (result) {
			await SecureStore.deleteItemAsync("cryptoKey");
		}
		console.log("CryptoKey deleted.");
	} catch (error) {
		console.log(`Failed to delete cryptoKey. Error: ${error}`);
	}
};
