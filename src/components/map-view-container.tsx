import { View, StyleSheet, Dimensions } from "react-native";
import MapView, { Polyline, UrlTile } from "react-native-maps";

import { baseUrl, statusBarHeight } from "../constants";
import { useTypedSelector } from "../store";

const styles = StyleSheet.create({
	map: {
		width: Dimensions.get("window").width,
		height: Dimensions.get("window").height,
		top: statusBarHeight + 50,
	},
});

/**
 * Visualizes topomap using NLS tiles and draws a route between
 * route coordinate points if show route state has been set to true.
 */
const MapViewContainer = (): JSX.Element => {
	const routeInfo = useTypedSelector((state) => state.route);
	const localWaypoints = useTypedSelector(
		(state) => state.waypoints.localWaypoints
	);

	return (
		<View>
			<MapView
				style={styles.map}
				showsUserLocation={true}
				initialRegion={{
					latitude: 60.204662,
					longitude: 24.962535,
					latitudeDelta: 0.01,
					longitudeDelta: 0.01,
				}}
			>
				<UrlTile
					urlTemplate={`${baseUrl}/nlsapi/{z}/{y}/{x}`}
					tileSize={256}
					maximumZ={19}
					zIndex={-3}
				/>
				<Polyline
					coordinates={routeInfo.showRoute ? localWaypoints : []}
					strokeColor="red"
					strokeWidth={4}
					zIndex={2}
				/>
				<Polyline
					coordinates={routeInfo.showRoute ? localWaypoints : []}
					strokeColor="black"
					strokeWidth={8}
					zIndex={1}
				/>
			</MapView>
		</View>
	);
};

export default MapViewContainer;
