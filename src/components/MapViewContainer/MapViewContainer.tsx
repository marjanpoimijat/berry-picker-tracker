import { useState } from "react";
import { View } from "react-native";
import MapView, { UrlTile } from "react-native-maps";
import { baseUrl } from "../../constants";
import { setMapLocation } from "../../reducers/map-location-reducer";
import { useTypedDispatch, useTypedSelector } from "../../store";
import Styles from "../../styles";
import { Coordinate } from "../../types";
import getTrackedUsersList from "../../utils/list";
import CoordinatesMarker from "./CoordinatesMarker";
import RouteLine from "./RouteLine";
import TrackedUserRoutes from "./TrackedUserRoutes";
import Waypoints from "./Waypoints";

/**
 * Visualizes topomap using map tiles and draws a route between
 * route coordinate points if show route state has been set to true.
 *
 * @returns {JSX.Element} A new MapViewContainer component.
 */
const MapViewContainer = (): JSX.Element => {
	const mapLocation = useTypedSelector((state) => state.mapLocation);
	const routeInfo = useTypedSelector((state) => state.route);
	const mapLifetime = useTypedSelector((state) => state.user.mapLifetime);
	const trackedUsers = useTypedSelector((state) => state.trackedUsers);
	const localWaypoints = useTypedSelector((state) => state.waypoints.localWaypoints);
	const currentMap = useTypedSelector((state) => state.map);

	const [coordinates, setCoordinates] = useState<Coordinate | null>(null);

	const users = getTrackedUsersList(trackedUsers);

	const dispatch = useTypedDispatch();

	const handleMapPress = (event: { nativeEvent: { coordinate: Coordinate } }) => {
		if (coordinates) {
			setCoordinates(null);
			return;
		}
		const { coordinate } = event.nativeEvent;
		setCoordinates(coordinate);
	};

	return (
		<View>
			<MapView
				initialRegion={{
					latitude: mapLocation.coords.latitude,
					latitudeDelta: mapLocation.coords.latitudeDelta,
					longitude: mapLocation.coords.longitude,
					longitudeDelta: mapLocation.coords.longitudeDelta,
				}}
				mapType={"none"}
				onPress={handleMapPress}
				onRegionChangeComplete={(region) => dispatch(setMapLocation({ coords: region }))}
				showsUserLocation={true}
				style={Styles.mapView}
			>
				<UrlTile
					maximumZ={19}
					offlineMode={false}
					tileCacheMaxAge={mapLifetime * 3600}
					tileCachePath={
						"/data/user/0/host.exp.exponent/cache/ExperienceData/" +
						"%40anonymous%2Fberry-picker-tracker-71573e14-92d4-46c9-a00b-" +
						"6e8cda3340f5/tiles/" +
						currentMap +
						"tiles/"
					}
					tileSize={256}
					urlTemplate={`${baseUrl}/${currentMap}/{z}/{y}/{x}`}
					zIndex={-3}
				/>
				<RouteLine
					id={-1}
					waypoints={routeInfo.showRoute ? localWaypoints : []}
				/>
				<TrackedUserRoutes users={users} />
				<Waypoints />
				<CoordinatesMarker coordinates={coordinates} />
			</MapView>
		</View>
	);
};

export default MapViewContainer;
