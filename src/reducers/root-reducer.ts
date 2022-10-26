import { combineReducers } from "redux";
import userReducer from "./user-reducer";
import routeReducer from "./route-reducer";
import waypointReducer from "./waypoint-reducer";

export default combineReducers({
	user: userReducer,
	route: routeReducer,
	waypoints: waypointReducer,
});
