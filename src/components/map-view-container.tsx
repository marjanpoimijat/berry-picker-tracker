import { View, StyleSheet, Dimensions } from "react-native";
import MapView, { Polyline, UrlTile, Circle } from "react-native-maps";

import { baseUrl, statusBarHeight, tileCacheDirectory } from "../constants";
import { useTypedSelector } from "../store";

const styles = StyleSheet.create({
	map: {
		width: Dimensions.get("window").width,
		height: Dimensions.get("window").height,
		top: statusBarHeight + 50,
	},
});

function getCircleColor(color: string): string {
	switch (color) {
		case "1g":
			return "rgba(254, 112, 238, 0.05)";
		case "2g":
			return "rgba(237, 143, 236, 0.05)";
		case "3g":
			return "rgba(235, 241, 63, 0.05)";
		case "4g":
			return "rgba(105, 219, 244, 0.05)";
		case "5g":
			return "rgba(137, 243, 120, 0.05)";
		default:
			return "rgba(228, 68, 68, 0.05)";
	}
}

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
				mapType={"none"}
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
					tileCachePath={tileCacheDirectory}
					tileCacheMaxAge={172800}
					offlineMode={false}
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
				{localWaypoints.map((waypoint, index) => {
					if (waypoint.connection !== null) {
						return (
							<Circle
								key={index}
								center={{
									latitude: waypoint.latitude,
									longitude: waypoint.longitude,
								}}
								fillColor={getCircleColor(waypoint.connection)}
								radius={15}
							/>
						);
					}
				})}
			</MapView>
		</View>
	);
};

export default MapViewContainer;
