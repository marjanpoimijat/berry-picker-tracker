import { combineReducers } from "redux";
import user from "./user-reducer";
import route from "./route-reducer";
import waypoints from "./waypoint-reducer";
import language from "./language-reducer";

export default combineReducers({ user, route, waypoints, language });
