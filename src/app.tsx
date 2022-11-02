import { registerRootComponent } from "expo";
import { NativeRouter } from "react-router-native";
import { Provider } from "react-redux";
import { persistor, store } from "./store";
import { PersistGate } from "redux-persist/integration/react";

import Main from "./main";

const App = () => {
	return (
		<NativeRouter>
			<Provider store={store}>
				<PersistGate loading={null} persistor={persistor}>
					<Main />
				</PersistGate>
			</Provider>
		</NativeRouter>
	);
};

export default registerRootComponent(App);
