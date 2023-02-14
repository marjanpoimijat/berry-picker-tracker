import { combineReducers } from "redux";

import coordinate from "./coordinate-reducer";
import language from "./language-reducer";
import route from "./route-reducer";
import user from "./user-reducer";
import waypoints from "./waypoint-reducer";

export default combineReducers({
	coordinate,
	language,
	route,
	user,
	waypoints,
});
