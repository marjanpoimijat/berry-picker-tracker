import Constants from "expo-constants";

const baseUrl = Constants.manifest.extra.uri;

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
