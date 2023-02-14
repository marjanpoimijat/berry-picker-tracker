import { combineReducers } from "redux";

import language from "./language-reducer";
import location from "./location-reducer";
import route from "./route-reducer";
import user from "./user-reducer";
import waypoints from "./waypoint-reducer";

export default combineReducers({
	language,
	location,
	route,
	user,
	waypoints,
});
