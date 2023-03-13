import * as SecureStore from "expo-secure-store";

/**
 * SecureStore is used to store tracked users' information
 * in a single JSON object named "tracked". SecureStore also stores the user's
 * crypto key which is used to encrypt and decrypt sent data.
 *
 * example JSON object:
 *
tracked: {
	sdi8ksso: {
		userId: 'sdi8ksso',
		alias: 'Esko'
	},
	ks889sss: {
		userID: 'ks889sss',
		alias: 'Huahei'
	}
}
 *
 */

export async function secureStoreAddTracked(userId: string, alias: string) {
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
			trackedJson[userId] = {
				alias: alias,
				locationVisible: true,
				routeVisible: true,
				userId: userId,
			};
			const newTracked = JSON.stringify(trackedJson);
			await SecureStore.setItemAsync("tracked", newTracked);
			console.log(`Storage updated: ${newTracked}`);
		}
	} catch (error) {
		console.log(`Failed to save key "${userId}". Error: ${error}`);
	}
}

export async function secureStoreGetTrackedUser(key: string) {
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
}

export async function secureStoreUpdateTrackedUser(
	userId: string,
	location: boolean,
	route: boolean
) {
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
		console.log(
			`Failed to flip routeVisible for user "${userId}". Error: ${error}`
		);
	}
}

export async function secureStoreDeleteTrackedUser(key: string) {
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
}

export async function secureStoreInitializeTrackedObject() {
	console.log("secureStoreInitializeTrackedObject()");
	try {
		await SecureStore.setItemAsync("tracked", "{}");
		console.log('Initialized "tracked" object.');
	} catch (error) {
		console.log(`Failed to initialize "tracked" object. Error: ${error}`);
	}
}

export async function secureStoreGetAllTrackedUsers() {
	//secureStoreDeleteTrackedObject();
	console.log("secureStoreGetAllTrackedUsers()");
	try {
		const tracked = await SecureStore.getItemAsync("tracked");
		//console.log(tracked);
		if (tracked) return tracked;
	} catch (error) {
		console.log(`Failed to get all users. Error: ${error}`);
	}
}

export async function secureStoreDeleteTrackedObject() {
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
}

export async function secureStoreGetTrackedObject() {
	console.log("secureStoreGetTrackedObject()");
	try {
		const tracked = await SecureStore.getItemAsync("tracked");
		return tracked;
	} catch (error) {
		console.log(
			`Failed to check whether "tracked" object exists. Error: ${error}`
		);
	}
}

export async function secureStoreAddCryptoKey(key: string) {
	try {
		await SecureStore.setItemAsync("cryptoKey", key);
		console.log("Crypto key updated.");
	} catch (error) {
		console.log(`Failed to save crypto key. Error: ${error}`);
	}
}

export async function secureStoreGetCryptoKey() {
	try {
		const cryptoKey = await SecureStore.getItemAsync("cryptoKey");
		return cryptoKey;
	} catch (error) {
		console.log(`Failed to get crypto key. Error: ${error}`);
	}
}

export async function secureStoreDeleteCryptoKey() {
	try {
		const result = await SecureStore.getItemAsync("cryptoKey");
		if (result) {
			await SecureStore.deleteItemAsync("cryptoKey");
		}
		console.log("CryptoKey deleted.");
	} catch (error) {
		console.log(`Failed to delete cryptoKey. Error: ${error}`);
	}
}
