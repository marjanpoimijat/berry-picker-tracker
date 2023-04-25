import { NativeRouter } from "react-router-native";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { persistor, store } from "./store";
import Main from "./Main";

const App = () => (
	<NativeRouter>
		<Provider store={store}>
			<PersistGate
				loading={null}
				persistor={persistor}
			>
				<Main />
			</PersistGate>
		</Provider>
	</NativeRouter>
);

export default App;
