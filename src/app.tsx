import { registerRootComponent } from "expo";
import { NativeRouter } from "react-router-native";

import Main from "./components/main";
import IdStorage from "./utils/id-storage";
import WaypointStorage from "./utils/waypoint-storage";
import UserIdStorageContext from "./contexts/user-id-context";
import RouteIdStorageContext from "./contexts/route-id-context";
import WaypointStorageContext from "./contexts/waypoint-context";

const userIdStorage = new IdStorage("user-id");
const routeIdStorage = new IdStorage("route-id");
const waypointStorage = new WaypointStorage("waypoint");

const App = () => {
	return (
		<NativeRouter>
			<UserIdStorageContext.Provider value={userIdStorage}>
				<RouteIdStorageContext.Provider value={routeIdStorage}>
					<WaypointStorageContext.Provider value={waypointStorage}>
						<Main />
					</WaypointStorageContext.Provider>
				</RouteIdStorageContext.Provider>
			</UserIdStorageContext.Provider>
		</NativeRouter>
	);
};

export default registerRootComponent(App);
