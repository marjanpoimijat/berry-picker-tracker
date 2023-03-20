import { Waypoint, WaypointFromServer } from "./types";
import { baseUrl } from "./constants";

export const createNewUser = async () => {
	const url = `${baseUrl}/new-user/`;
	const settings = {
		body: JSON.stringify({}),
		headers: {
			Accept: "application/json",
			"Content-Type": "application/json",
		},
		method: "POST",
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
		body: JSON.stringify({ active: true, user_id: userId }),
		headers: {
			Accept: "application/json",
			"Content-Type": "application/json",
		},
		method: "POST",
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
		body: JSON.stringify(waypoints),
		headers: {
			Accept: "application/json",
			"Content-Type": "application/json",
		},
		method: "POST",
	};
	try {
		const response = await fetch(url, settings);
		return response;
	} catch (error) {
		console.log(error);
	}
};

export const deactivateExistingRoute = async (routeId: string) => {
	const url = `${baseUrl}/deactivate-route/`;
	const settings = {
		headers: {
			Accept: "application/json",
			"Content-Type": "application/json",
			"route-id": routeId,
		},
		method: "PATCH",
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
		headers: {
			Accept: "application/json",
			"Content-Type": "application/json",
			"user-id": userId,
		},
		method: "GET",
	};
	try {
		const response = await fetch(url, settings);
		const data = await response.json();
		const routeId: string = data[0];
		const active: boolean = data[1];
		const waypoints: WaypointFromServer[] = data[2];
		return { active, routeId, waypoints };
	} catch (error) {
		console.log(error);
	}
};

export const deleteUser = async (userId: string) => {
	const url = `${baseUrl}/delete-user/`;
	const settings = {
		headers: {
			Accept: "application/json",
			"Content-Type": "application/json",
			"user-id": userId,
		},
		method: "DELETE",
	};
	try {
		const response = await fetch(url, settings);
		const data = await response.json();
		return data;
	} catch (error) {
		console.log(error);
	}
};
