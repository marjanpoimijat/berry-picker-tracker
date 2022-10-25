import { combineReducers } from "redux";
import userReducer from "./user-reducer";
import routeReducer from "./route-reducer";

export default combineReducers({
	user: userReducer,
	route: routeReducer,
});
