import * as SecureStore from "expo-secure-store";

/**
 * SecureStore is used to store tracked users' information
 * in a single JSON object named "tracked".
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
		const objectExists = await secureStoreCheckIfTrackedExists();
		if (!objectExists) {
			await secureStoreInitialize();
		}
		const userList = await secureStoreGetAllUsers();
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

export async function secureStoreGetUser(key: string) {
	console.log("secureStoreGetUser()");
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

export async function secureStoreUpdateUser(userId: string) {
	console.log("secureStoreUpdateUser()");
	try {
		const tracked = await SecureStore.getItemAsync("tracked");
		if (tracked) {
			const trackedJson = JSON.parse(tracked);
			// eslint-disable-next-line no-prototype-builtins
			if (trackedJson.hasOwnProperty(userId)) {
				trackedJson[userId].locationVisible =
					!trackedJson[userId].locationVisible;
				const newTracked = JSON.stringify(trackedJson);
				await SecureStore.setItemAsync("tracked", newTracked);
				console.log(`Storage updated: ${newTracked}`);
			} else {
				console.log(`User "${userId}" not found.`);
			}
		}
	} catch (error) {
		console.log(
			`Failed to flip routeVisible for user "${userId}". Error: ${error}`
		);
	}
}

export async function secureStoreDeleteUser(key: string) {
	console.log("secureStoreDeleteUser()");
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

export async function secureStoreInitialize() {
	console.log("secureStoreInitialize()");
	try {
		await SecureStore.setItemAsync("tracked", "{}");
		console.log('Initialized "tracked" object.');
	} catch (error) {
		console.log(`Failed to initialize "tracked" object. Error: ${error}`);
	}
}

export async function secureStoreGetAllUsers() {
	//secureStoreDeleteAll();
	console.log("secureStoreGetAllUsers()");
	try {
		const tracked = await SecureStore.getItemAsync("tracked");
		//console.log(tracked);
		if (tracked) return tracked;
	} catch (error) {
		console.log(`Failed to get all users. Error: ${error}`);
	}
}

export async function secureStoreDeleteAll() {
	console.log("secureStoreDeleteAll()");
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

export async function secureStoreCheckIfTrackedExists() {
	console.log("secureStoreCheckIfTrackedExists()");
	try {
		const tracked = await SecureStore.getItemAsync("tracked");
		return tracked;
	} catch (error) {
		console.log(
			`Failed to check whether "tracked" object exists. Error: ${error}`
		);
	}
}
