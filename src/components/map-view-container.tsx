import { useState } from "react";
import { Text, View } from "react-native";
import MapView, { Polyline, UrlTile, Circle, Marker } from "react-native-maps";
import { baseUrl } from "../constants";
import { setMapLocation } from "../reducers/map-location-reducer";
import { useTypedDispatch, useTypedSelector } from "../store";
import Styles from "../styles";
import { Coordinate, TrackedUsers } from "../types";
import { parseLatitude, parseLongitude } from "../utils/coordinates";
import getCircleColor from "../utils/circle";
import sortTrackedUserList from "../utils/sort";
import TrackedUserRoute from "./tracked-user-route";

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
	const trackedUsers: TrackedUsers = useTypedSelector((state) => state.trackedUsers);
	const [localWaypoints, currMap] = useTypedSelector((state) => [state.waypoints.localWaypoints, state.map]);
	const [coordinates, setCoordinates] = useState<Coordinate | null>(null);
	const sortedUsers = sortTrackedUserList(trackedUsers);

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
						currMap +
						"tiles/"
					}
					tileSize={256}
					urlTemplate={`${baseUrl}/${currMap}/{z}/{y}/{x}`}
					zIndex={-3}
				/>
				<Polyline
					coordinates={routeInfo.showRoute ? localWaypoints : []}
					strokeColor="#4285f4"
					strokeWidth={4}
					zIndex={2}
				/>
				<Polyline
					coordinates={routeInfo.showRoute ? localWaypoints : []}
					strokeColor="white"
					strokeWidth={6.5}
					zIndex={1}
				/>
				{sortedUsers.map((user) => (
					<TrackedUserRoute
						key={user.id}
						user={user}
					/>
				))}
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
				{coordinates && (
					<>
						<Marker
							coordinate={coordinates}
							style={{ height: 50 }}
						>
							<View style={Styles.coordinateBoxContainer}>
								<View style={Styles.coordinateBox}>
									<Text>
										{parseLatitude(coordinates.latitude)}, {parseLongitude(coordinates.longitude)}
									</Text>
								</View>
							</View>
						</Marker>
						<Marker coordinate={coordinates}>
							<View style={Styles.coordinateDot} />
						</Marker>
					</>
				)}
			</MapView>
		</View>
	);
};

export default MapViewContainer;
