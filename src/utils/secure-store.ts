import * as SecureStore from "expo-secure-store";

export async function save(key: string, value: string) {
	await SecureStore.setItemAsync(key, value);
}

export async function getValueFor(key: string) {
	const result = await SecureStore.getItemAsync(key);
	if (result) {
		console.log("Here's your value: " + result);
	} else {
		console.log("No values stored under that key.");
	}
}

export async function deleteKey(key: string) {
	try {
		await SecureStore.deleteItemAsync(key);
		console.log(`Key "${key}" deleted successfully.`);
	} catch (error) {
		console.log(`Failed to delete key "${key}". Error: ${error}`);
	}
}
