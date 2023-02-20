import moment from "moment";

import { View } from "react-native";
import MapView, { Marker, Polyline, UrlTile } from "react-native-maps";

import { baseUrl, tileCacheDirectory } from "../constants";
import { languages } from "../languages";
import { useTypedSelector } from "../store";
import Styles from "../styles";
import { usersLocationInfo } from "../types";
import { parseLatitude, parseLongitude } from "../utils/coordinates";

/**
 * Visualizes topomap using NLS tiles and draws a users route between
 * latest route waypoints. Show marker at the latest waypoint location.
 * Timestamp will be shown when the marker has been pressed.
 * Initial region will be shown at the Kumpula campus if list of users waypoint is empty.
 */
const FindUserRouteMap = ({
	usersWaypoints,
	usersLatestWaypoint,
}: usersLocationInfo): JSX.Element => {
	const language = useTypedSelector((state) => state.language);
	const mapLifetime = useTypedSelector((state) => state.user.mapLifetime);

	const formatDate = (dateString: number): string => {
		const date = new Date(dateString);
		const formattedDate = moment(date).format("YYYY-MM-DD HH:mm:ss");
		return formattedDate;
	};

	const lat = usersLatestWaypoint ? usersLatestWaypoint.latitude : 0;
	const lon = usersLatestWaypoint ? usersLatestWaypoint.longitude : 0;

	return (
		<View>
			<MapView
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
				mapType={"none"}
				showsUserLocation={true}
				style={Styles.smallMapView}
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
					coordinate={{
						latitude: usersLatestWaypoint
							? usersLatestWaypoint.latitude
							: 60.204662,
						longitude: usersLatestWaypoint
							? usersLatestWaypoint.longitude
							: 24.962535,
					}}
					description={
						usersLatestWaypoint
							? formatDate(usersLatestWaypoint.ts)
							: languages["Update search a bit later"][language]
					}
					title={
						usersLatestWaypoint
							? `${parseLatitude(lat)}, ${parseLongitude(lon)}`
							: languages["Latest waypoint is not available"][language]
					}
				/>
			</MapView>
		</View>
	);
};

export default FindUserRouteMap;
