import * as SecureStore from "expo-secure-store";

/**
 * SecureStore is used to store tracked users' information
 * in a single JSON object named "tracked".
 *
 * example JSON object:
 *
tracked: {
	sdi8ksso: {
		UserID: 'sdi8ksso'
	},
	ks889sss: {
		UserID: 'ks889sss'
	}
}
 *
 */

export async function secureStoreAddTracked(userId: string) {
	console.log("\n\nsecureStoreAddTracked()");
	const result = await SecureStore.getItemAsync("tracked");
	if (!result) {
		await SecureStore.setItemAsync("tracked", "{}");
	}
	try {
		const tracked = await SecureStore.getItemAsync("tracked");
		if (tracked) {
			const trackedJson = JSON.parse(tracked);
			trackedJson[userId] = { UserID: userId };
			const newTracked = JSON.stringify(trackedJson);
			await SecureStore.setItemAsync("tracked", newTracked);
			console.log(`Storage updated: ${newTracked}`);
		} else {
			console.log('"Tracked" object not found.');
		}
	} catch (error) {
		console.log(`Failed to save key "${userId}". Error: ${error}`);
	}
}

export async function secureStoreGetUser(key: string) {
	console.log("\n\nsecureStoreGetUser()");
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

export async function secureStoreDeleteUser(key: string) {
	console.log("\n\nsecureStoreDeleteUser()");
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
	console.log("\n\nsecureStoreInitialize()");
	try {
		await SecureStore.setItemAsync("tracked", "{}");
		console.log('Initialized "tracked" object.');
	} catch (error) {
		console.log(`Failed to initialize "tracked" object. Error: ${error}`);
	}
}

export async function secureStoreGetAllUsers() {
	console.log("\n\nsecureStoreGetAllUsers()");
	try {
		const tracked = await SecureStore.getItemAsync("tracked");
		if (tracked) {
			const trackedJson = JSON.parse(tracked);
			const userList = Object.keys(trackedJson);
			console.log("User list: ", userList);
			console.log('"tracked" object:\n', trackedJson);
			return userList;
		} else {
			console.log('"Tracked" object not found.');
		}
	} catch (error) {
		console.log(`Failed to get all users. Error: ${error}`);
	}
}

export async function secureStoreDeleteAll() {
	console.log("\n\nsecureStoreDeleteAll()");
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
