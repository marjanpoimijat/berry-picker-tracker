import { View, StyleSheet, Dimensions } from "react-native";
import MapView, { Marker, Polyline, UrlTile } from "react-native-maps";

import { baseUrl, tileCacheDirectory } from "../constants";
import { useTypedSelector } from "../store";
import { usersLocationInfo } from "../types";

const styles = StyleSheet.create({
	map: {
		width: Dimensions.get("window").width * 0.9,
		height: Dimensions.get("window").height * 0.6,
	},
});

/**
 * Visualizes topomap using NLS tiles and draws a users route between
 * latest route waypoints. Show marker at the latest waypoint location.
 * Timestamp will be shown when the marker has been pressed.
 * Initial region will be shown at the Kumpula kampus if list of users waypoint is empty.
 */
const FindUserRouteContainer = ({
	usersWaypoints,
	usersLatestWaypoint,
}: usersLocationInfo): JSX.Element => {
	const mapLifetime = useTypedSelector((state) => state.user.mapLifetime);

	return (
		<View>
			<MapView
				mapType={"none"}
				style={styles.map}
				showsUserLocation={true}
				initialRegion={{
					latitude: usersLatestWaypoint
						? usersLatestWaypoint.latitude
						: 60.204662,
					longitude: usersLatestWaypoint
						? usersLatestWaypoint.longitude
						: 24.962535,
					latitudeDelta: 0.05,
					longitudeDelta: 0.05,
				}}
			>
				<UrlTile
					urlTemplate={`${baseUrl}/nlsapi/{z}/{y}/{x}`}
					tileSize={256}
					maximumZ={19}
					zIndex={-3}
					tileCachePath={tileCacheDirectory}
					tileCacheMaxAge={mapLifetime * 3600}
					offlineMode={false}
				/>
				<Polyline
					coordinates={usersWaypoints}
					strokeColor="green"
					strokeWidth={4}
					zIndex={2}
				/>
				<Polyline
					coordinates={usersWaypoints}
					strokeColor="black"
					strokeWidth={8}
					zIndex={1}
				/>
				<Marker
					title={
						usersLatestWaypoint
							? "Latest waypoint timestamp"
							: "Latest waypoint is not available"
					}
					description={
						usersLatestWaypoint
							? usersLatestWaypoint.ts.toString()
							: "Update search a bit later"
					}
					coordinate={{
						latitude: usersLatestWaypoint
							? usersLatestWaypoint.latitude
							: 60.204662,
						longitude: usersLatestWaypoint
							? usersLatestWaypoint.longitude
							: 24.962535,
					}}
				/>
			</MapView>
		</View>
	);
};

export default FindUserRouteContainer;
