import { View } from "react-native";
import MapView, { Marker, Polyline, UrlTile } from "react-native-maps";

import { baseUrl, tileCacheDirectory } from "../constants";
import { languages } from "../languages";
import { useTypedSelector } from "../store";
import Styles from "../styles";
import { usersLocationInfo } from "../types";

/**
 * Visualizes topomap using NLS tiles and draws a users route between
 * latest route waypoints. Show marker at the latest waypoint location.
 * Timestamp will be shown when the marker has been pressed.
 * Initial region will be shown at the Kumpula kampus if list of users waypoint is empty.
 */
const FindUserRouteMap = ({
	usersWaypoints,
	usersLatestWaypoint,
}: usersLocationInfo): JSX.Element => {
	const language = useTypedSelector((state) => state.language);
	const mapLifetime = useTypedSelector((state) => state.user.mapLifetime);

	return (
		<View>
			<MapView
				mapType={"none"}
				style={Styles.smallMapView}
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
							? languages["Latest waypoint timestamp"][language]
							: languages["Latest waypoint is not available"][language]
					}
					description={
						usersLatestWaypoint
							? usersLatestWaypoint.ts.toString()
							: languages["Update search a bit later"][language]
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

export default FindUserRouteMap;
