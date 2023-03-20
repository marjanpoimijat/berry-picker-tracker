import { View } from "react-native";
import MapView, { Marker, Polyline, UrlTile } from "react-native-maps";

import { baseUrl } from "../constants";
import { languages } from "../languages";
import { useTypedSelector } from "../store";
import Styles from "../styles";
import { UsersLocationInfo } from "../../types";
import { parseLatitude, parseLongitude } from "../utils/coordinates";
import { formatDate } from "../utils/date";

/**
 * Visualizes topomap using NLS tiles and draws a users route between
 * latest route waypoints. Show marker at the latest waypoint location.
 * Timestamp will be shown when the marker has been pressed.
 * Initial region will be shown at the Kumpula campus if list of users waypoint is empty.
 */
const FindUserRouteMap = ({
	usersWaypoints,
	usersLatestWaypoint,
}: UsersLocationInfo): JSX.Element => {
	const language = useTypedSelector((state) => state.language);
	const mapLifetime = useTypedSelector((state) => state.user.mapLifetime);
	const currMap = useTypedSelector((state) => state.map);

	const lat = usersLatestWaypoint ? usersLatestWaypoint.latitude : 0;
	const lon = usersLatestWaypoint ? usersLatestWaypoint.longitude : 0;

	return (
		<View>
			<MapView
				initialRegion={{
					latitude: usersLatestWaypoint
						? usersLatestWaypoint.latitude
						: 60.204662,
					latitudeDelta: 0.05,
					longitude: usersLatestWaypoint
						? usersLatestWaypoint.longitude
						: 24.962535,
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
					tileCachePath={
						"/data/user/0/host.exp.exponent/cache/ExperienceData/" +
						"%40anonymous%2Fberry-picker-tracker-71573e14-92d4-46c9-a00b-" +
						"6e8cda3340f5/tiles/" +
						currMap +
						"tiles/"
					}
					tileSize={256}
					urlTemplate={`${baseUrl}/${currMap}/{z}/{y}/{x}`}
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
