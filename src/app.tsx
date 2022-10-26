import { registerRootComponent } from "expo";
import { NativeRouter } from "react-router-native";
import { Provider } from "react-redux";

import Main from "./main";
import WaypointStorage from "./utils/waypoint-storage";
import WaypointStorageContext from "./contexts/waypoint-context";

import { persistor, store } from "./store";
import { PersistGate } from "redux-persist/integration/react";

const waypointStorage = new WaypointStorage("waypoint");

const App = () => {
	return (
		<NativeRouter>
			<WaypointStorageContext.Provider value={waypointStorage}>
				<Provider store={store}>
					<PersistGate loading={null} persistor={persistor}>
						<Main />
					</PersistGate>
				</Provider>
			</WaypointStorageContext.Provider>
		</NativeRouter>
	);
};

export default registerRootComponent(App);
