import * as SecureStore from "expo-secure-store";

/**
 * SecureStore is used to store tracked users' crypto key
 * in a single JSON object named "tracked". SecureStore also stores the user's
 * own crypto key. Crypto keys are used to encrypt and decrypt sent data between users.
 *
 * @param {string} userId UserID of the user to be added.
 * @param {string} cryptoKey The key used to decrypt the shared data.
 * @returns {void}
 *
 * Example JSON object:
 *
 * tracked: {
 *   Y0QsWBzUwP89: {
 *	   userId: 'Y0QsWBzUwP89',
 *	   cryptoKey: 'sdfdsff',
 *	 },
 *	 W9RZL7VXJ3FK: {
 *	   userId: 'W9RZL7VXJ3FK',
 *	   cryptoKey: '34k0430'
 *	 },
 * }
 *
 * Example cryptokey object:
 *
 * cryptoKey: 'sd9fk3+f0sdf3'
 */
export const secureStoreAddTracked = async (userId: string, cryptoKey: string) => {
	try {
		const trackedObject = await SecureStore.getItemAsync("tracked");
		if (!trackedObject) {
			await secureStoreInitializeTrackedObject();
		} else if (trackedObject.includes(userId)) {
			console.log(`${userId} is already added to tracked users. Updating...`);
		}
		const tracked = await SecureStore.getItemAsync("tracked");
		if (tracked) {
			const trackedJson = JSON.parse(tracked);
			const userObject = {
				cryptoKey: cryptoKey,
				userId: userId,
			};
			//store.dispatch(addTrackedUser(trackedObject));
			trackedJson[userId] = userObject;
			const newTracked = JSON.stringify(trackedJson);
			await SecureStore.setItemAsync("tracked", newTracked);
			console.log(`Secure store: ${userId} added to tracked users.`);
		}
	} catch (error) {
		console.log(`Failed to add ${userId} to tracked users. Error: ${error}`);
	}
};

export const secureStoreGetTrackedUser = async (userId: string) => {
	try {
		const tracked = await SecureStore.getItemAsync("tracked");
		if (tracked) {
			const trackedJson = JSON.parse(tracked);
			const value = trackedJson[userId];
			if (value) {
				return value;
			} else {
				console.log("No values stored under that userId.");
			}
		} else {
			console.log('"Tracked" object not found.');
		}
	} catch (error) {
		console.log(`Failed to get user ${userId}. Error: ${error}`);
	}
};

export const secureStoreDeleteTrackedUser = async (userId: string) => {
	try {
		const tracked = await SecureStore.getItemAsync("tracked");
		if (tracked) {
			const trackedJson = JSON.parse(tracked);
			if (!trackedJson[userId]) {
				console.log(`Error during deletion: ${userId} not found.`);
				return;
			}
			delete trackedJson[userId];
			const newTracked = JSON.stringify(trackedJson);
			await SecureStore.setItemAsync("tracked", newTracked);
			console.log(`User ${userId} deleted successfully.`);
		} else {
			console.log('Error: "tracked" object not found.');
		}
	} catch (error) {
		console.log(`Failed to delete user ${userId}. Error: ${error}`);
	}
};

export const secureStoreInitializeTrackedObject = async () => {
	try {
		await SecureStore.setItemAsync("tracked", "{}");
		console.log('Initialized "tracked" object.');
	} catch (error) {
		console.log(`Failed to initialize "tracked" object. Error: ${error}`);
	}
};

export const secureStoreDeleteTrackedObject = async () => {
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
