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
