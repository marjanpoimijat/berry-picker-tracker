import AsyncStorage from "@react-native-async-storage/async-storage";
import { LocationObject } from "expo-location";

interface Waypoint {
	routeId: string;
	location: LocationObject;
	mnc: string | null;
}

class WaypointStorage {
	namespace: string;
	constructor(namespace = "waypoint") {
		this.namespace = namespace;
	}

	async getWaypoints() {
		console.log(`getting existing waypoints...`);
		try {
			const existingWaypoints = await AsyncStorage.getItem(
				`${this.namespace}.waypoints`
			);
			return existingWaypoints ? JSON.parse(existingWaypoints) : [];
		} catch (error) {
			console.log(error);
		}
	}

	async addWaypoint(waypointObject: Waypoint) {
		console.log(`storing new waypoint into the storage...`);
		try {
			const existingWaypoints = await this.getWaypoints();
			const updatedWaypoints = [...existingWaypoints, waypointObject];
			await AsyncStorage.setItem(
				`${this.namespace}.waypoints`,
				JSON.stringify(updatedWaypoints)
			);
		} catch (error) {
			console.log(error);
		}
	}

	async clearWaypoints() {
		console.log(`waypoints has been removed from the storage...`);
		try {
			await AsyncStorage.removeItem(`${this.namespace}.waypoints`);
		} catch (error) {
			console.log(error);
		}
	}
}

export default WaypointStorage;
