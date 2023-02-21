import * as SecureStore from "expo-secure-store";

//this file is still under construction bitch

export async function secureStoreAddTracked(userId: string) {
	const result = await SecureStore.getItemAsync("tracked");
	if (!result) {
		await SecureStore.setItemAsync("tracked", "{}");
	}
	try {
		const tracked = await secureStoreGet("tracked");
		const trackedJson = JSON.parse(tracked); //wtf am i supposed to do now
		trackedJson[userId] = {};
		const newTracked = JSON.stringify(trackedJson);
		await SecureStore.setItemAsync("tracked", newTracked);
		console.log(`Storage updated: ${trackedJson}`);
	} catch (error) {
		console.log(`Failed to save key "${userId}". Error: ${error}`);
	}
}

export async function secureStoreGet(key: string) {
	const tracked = await SecureStore.getItemAsync("tracked");
	const trackedJson = JSON.parse(tracked); //help needed
	const value = trackedJson[key]; //this is where i left off
	if (value) {
		console.log("Here's your value: " + value); //temporary
		return {
			value,
		};
	} else {
		console.log("No values stored under that key.");
	}
}

export async function secureStoreDelete(key: string) {
	try {
		await SecureStore.deleteItemAsync(key);
		console.log(`Key "${key}" deleted successfully.`);
	} catch (error) {
		console.log(`Failed to delete key "${key}". Error: ${error}`);
	}
}
