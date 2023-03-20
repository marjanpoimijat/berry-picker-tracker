import { TrackedUsers } from "../types";

const sortTrackedUserList = (trackedUsers: TrackedUsers) => {
	if (!trackedUsers) return [];
	return Object.entries(trackedUsers)
		.map(([key, value]) => ({
			id: Number(key),
			locationVisible: value.locationVisible,
			routeVisible: value.routeVisible,
			userId: value.userId,
			username: value.username,
		}))
		.sort((a, b) => a.username.localeCompare(b.username));
};

export default sortTrackedUserList;
