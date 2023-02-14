import { combineReducers } from "redux";

import language from "./language-reducer";
import currentLocation from "./current-location-reducer";
import mapLocation from "./map-location-reducer";
import route from "./route-reducer";
import user from "./user-reducer";
import waypoints from "./waypoint-reducer";

export default combineReducers({
	language,
	currentLocation,
	mapLocation,
	route,
	user,
	waypoints,
});
