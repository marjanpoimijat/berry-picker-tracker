import AsyncStorage from "@react-native-async-storage/async-storage";

class UserIdStorage {
	namespace: string;
	constructor(namespace = "userId") {
		this.namespace = namespace;
	}

	async getUserId() {
		return await AsyncStorage.getItem(`${this.namespace}:id`);
	}

	async setUserId(userId: string) {
		await AsyncStorage.setItem(`${this.namespace}:id`, userId);
	}

	async removeUserId() {
		await AsyncStorage.removeItem(`${this.namespace}:id`);
	}
}

export default UserIdStorage;
