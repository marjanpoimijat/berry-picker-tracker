import { TrackedUser, TrackedUsers } from "../types";

const getTrackedUsersList = (trackedUsers: TrackedUsers): TrackedUser[] => {
	if (!trackedUsers) return [];
	return Object.entries(trackedUsers).map(([key, value]) => ({
		id: value.id,
		locationVisible: value.locationVisible,
		routeVisible: value.routeVisible,
		userId: key,
		username: value.username,
	}));
};

export default getTrackedUsersList;
