import { Waypoint, WaypointFromServer } from "./types";
import { baseUrl } from "./constants";

export const createNewUser = async () => {
	const url = `${baseUrl}/new-user/`;
	const settings = {
		method: "POST",
		headers: {
			Accept: "application/json",
			"Content-Type": "application/json",
		},
		body: JSON.stringify({}),
	};
	try {
		const response = await fetch(url, settings);
		const data = await response.json();
		return data;
	} catch (error) {
		console.log(error);
	}
};

export const startNewRoute = async (userId: string) => {
	const url = `${baseUrl}/start-route/`;
	const settings = {
		method: "POST",
		headers: {
			Accept: "application/json",
			"Content-Type": "application/json",
		},
		body: JSON.stringify({ user_id: userId, active: true }),
	};
	try {
		const response = await fetch(url, settings);
		const data = await response.json();
		return data;
	} catch (error) {
		console.log(error);
	}
};

export const sendNewWaypoint = async (pendingWaypoints: Array<Waypoint>) => {
	const url = `${baseUrl}/create-waypoint/`;
	const waypoints = pendingWaypoints.map((waypoint) => {
		return {
			route_id: waypoint.routeId,
			...waypoint,
		};
	});
	const settings = {
		method: "POST",
		headers: {
			Accept: "application/json",
			"Content-Type": "application/json",
		},
		body: JSON.stringify(waypoints),
	};
	try {
		const response = await fetch(url, settings);
		const data = await response.json();
		return data;
	} catch (error) {
		console.log(error);
	}
};

export const deactivateExistingRoute = async (routeId: string) => {
	const url = `${baseUrl}/deactivate-route/`;
	const settings = {
		method: "PATCH",
		headers: {
			Accept: "application/json",
			"Content-Type": "application/json",
			"route-id": routeId,
		},
	};
	try {
		const response = await fetch(url, settings);
		const data = await response.json();
		console.log(`Route id ${data.id} active status set to: ${data.active}`);
	} catch (error) {
		console.log(error);
	}
};

export const getUsersLatestRoute = async (userId: string) => {
	const url = `${baseUrl}/get-users-latest-route/`;
	const settings = {
		method: "GET",
		headers: {
			Accept: "application/json",
			"Content-Type": "application/json",
			"user-id": userId,
		},
	};
	try {
		const response = await fetch(url, settings);
		const data = await response.json();
		const routeId: string = data[0];
		const active: boolean = data[1];
		const waypoints: WaypointFromServer[] = data[2];
		return { routeId, active, waypoints };
	} catch (error) {
		console.log(error);
	}
};
