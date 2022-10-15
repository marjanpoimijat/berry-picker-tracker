import { useContext } from "react";

import WaypointStorageContext from "../contexts/waypoint-context";

const useWaypointStorage = () => {
	return useContext(WaypointStorageContext);
};

export default useWaypointStorage;
