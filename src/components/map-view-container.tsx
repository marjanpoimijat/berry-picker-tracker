import { View, StyleSheet, Dimensions } from "react-native";
import MapView, { LatLng, Polyline, UrlTile } from "react-native-maps";
import Constants from "expo-constants";

const baseUrl = Constants.manifest.extra.uri;

const styles = StyleSheet.create({
	map: {
		width: Dimensions.get("window").width,
		height: Dimensions.get("window").height,
		top: Constants.statusBarHeight + 50,
	},
});

interface Props {
	/** State to determine whether route is visible or not */
	showRoute: boolean;
	/** List of route coordinate objects with latitude / longitude numbers */
	routeCoordinates: Array<LatLng>;
}

/**
 * Visualizes topomap using NLS tiles and draws a route between
 * route coordinate points if show route state has been set to true.
 * @returns a tree of React elements
 */
const MapViewContainer = ({
	showRoute,
	routeCoordinates,
}: Props): JSX.Element => {
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
					coordinates={showRoute ? routeCoordinates : []}
					strokeColor="red"
					strokeWidth={4}
					zIndex={2}
				/>
				<Polyline
					coordinates={showRoute ? routeCoordinates : []}
					strokeColor="black"
					strokeWidth={8}
					zIndex={1}
				/>
			</MapView>
		</View>
	);
};

export default MapViewContainer;
