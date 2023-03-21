import { combineReducers } from "redux";

import currentLocation from "./current-location-reducer";
import id from "./id-reducer";
import language from "./language-reducer";
import map from "./map-reducer";
import mapLocation from "./map-location-reducer";
import route from "./route-reducer";
import trackedUsers from "./tracker-users-reducer";
import ui from "./ui-reducer";
import user from "./user-reducer";
import waypoints from "./waypoint-reducer";

export default combineReducers({
	currentLocation,
	id,
	language,
	map,
	mapLocation,
	route,
	trackedUsers,
	ui,
	user,
	waypoints,
});
