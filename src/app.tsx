import { registerRootComponent } from "expo";

import Main from "./components/main";
import IdStorage from "./utils/id-storage";
import UserIdStorageContext from "./contexts/user-id-context";
import RouteIdStorageContext from "./contexts/route-id-context";

const userIdStorage = new IdStorage("user-id");
const routeIdStorage = new IdStorage("route-id");

const App = () => {
	return (
		<UserIdStorageContext.Provider value={userIdStorage}>
			<RouteIdStorageContext.Provider value={routeIdStorage}>
				<Main />
			</RouteIdStorageContext.Provider>
		</UserIdStorageContext.Provider>
	);
};

export default registerRootComponent(App);
