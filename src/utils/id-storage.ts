import AsyncStorage from "@react-native-async-storage/async-storage";

class IdStorage {
	namespace: string;
	constructor(namespace = "id") {
		this.namespace = namespace;
	}

	async getId() {
		console.log(`looking for ${this.namespace}...`);
		try {
			return await AsyncStorage.getItem(`${this.namespace}.id`);
		} catch (error) {
			console.log(error);
		}
	}

	async setId(id: string) {
		console.log(`${this.namespace} ${id} stored into the storage...`);
		try {
			await AsyncStorage.setItem(`${this.namespace}.id`, id);
		} catch (error) {
			console.log(error);
		}
	}

	async removeId() {
		console.log(`${this.namespace} removed from the storage...`);
		try {
			await AsyncStorage.removeItem(`${this.namespace}.id`);
		} catch (error) {
			console.log(error);
		}
	}
}

export default IdStorage;
