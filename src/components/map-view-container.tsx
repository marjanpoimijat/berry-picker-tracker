import { View } from "react-native";
import MapView, { Polyline, UrlTile, Circle } from "react-native-maps";

import { baseUrl, tileCacheDirectory } from "../constants";
import { setMapLocation } from "../reducers/map-location-reducer";
import { useTypedDispatch, useTypedSelector } from "../store";
import Styles from "../styles";

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
	const mapLocation = useTypedSelector((state) => state.mapLocation);
	const routeInfo = useTypedSelector((state) => state.route);
	const mapLifetime = useTypedSelector((state) => state.user.mapLifetime);
	const localWaypoints = useTypedSelector(
		(state) => state.waypoints.localWaypoints
	);
	const dispatch = useTypedDispatch();

	return (
		<View>
			<MapView
				initialRegion={{
					latitude: mapLocation.coords.latitude,
					longitude: mapLocation.coords.longitude,
					latitudeDelta: mapLocation.coords.latitudeDelta,
					longitudeDelta: mapLocation.coords.longitudeDelta,
				}}
				mapType={"none"}
				onRegionChangeComplete={(region) =>
					dispatch(setMapLocation({ coords: region }))
				}
				showsUserLocation={true}
				style={Styles.mapView}
			>
				<UrlTile
					maximumZ={19}
					offlineMode={false}
					tileCacheMaxAge={mapLifetime * 3600}
					tileCachePath={tileCacheDirectory}
					tileSize={256}
					urlTemplate={`${baseUrl}/nlsapi/{z}/{y}/{x}`}
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
				{localWaypoints.map((waypoint, index) => {
					if (waypoint.connection !== null) {
						return (
							<Circle
								center={{
									latitude: waypoint.latitude,
									longitude: waypoint.longitude,
								}}
								fillColor={getCircleColor(waypoint.connection)}
								key={index}
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
