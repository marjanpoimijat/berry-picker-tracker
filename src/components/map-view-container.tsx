import { useEffect, useState } from "react";
import { Text, View } from "react-native";
import MapView, { Polyline, UrlTile, Circle, Marker } from "react-native-maps";

import { baseUrl } from "../constants";
import { setMapLocation } from "../reducers/map-location-reducer";
import { getUsersLatestRoute } from "../requests";
import { useTypedDispatch, useTypedSelector } from "../store";
import Styles from "../styles";
import { TrackedUsers, Waypoint, WaypointFromServer } from "../types";
import { colors } from "../utils/colors";
import { parseLatitude, parseLongitude } from "../utils/coordinates";
import { secureStoreGetAllTrackedUsers } from "../utils/secure-store";

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

interface Coordinate {
	latitude: number;
	longitude: number;
}

/**
 * Visualizes topomap using NLS tiles and draws a route between
 * route coordinate points if show route state has been set to true.
 */
const MapViewContainer = (): JSX.Element => {
	const mapLocation = useTypedSelector((state) => state.mapLocation);
	const routeInfo = useTypedSelector((state) => state.route);
	const mapLifetime = useTypedSelector((state) => state.user.mapLifetime);
	const [localWaypoints, currMap] = useTypedSelector((state) => [
		state.waypoints.localWaypoints,
		state.map,
	]);
	const dispatch = useTypedDispatch();
	const [coordinates, setCoordinates] = useState<Coordinate | null>(null);

	const handleMapPress = (event: {
		nativeEvent: { coordinate: Coordinate };
	}) => {
		if (coordinates) {
			setCoordinates(null);
			return;
		}
		const { coordinate } = event.nativeEvent;
		setCoordinates(coordinate);
	};

	const [localUsers, setLocalUsers] = useState<TrackedUsers>();

	const getUsers = async () => {
		const users = await secureStoreGetAllTrackedUsers();
		if (users) setLocalUsers(JSON.parse(users));
	};

	useEffect(() => {
		getUsers();
	}, []);

	const dataArray = localUsers ? Object.entries(localUsers) : [];
	const mappedUsers = dataArray.map(([key, value]) => ({
		alias: value.alias,
		id: key,
		locationVisible: value.locationVisible,
		routeVisible: value.routeVisible,
		userId: value.userId,
	}));

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
				{mappedUsers.map((user, index) => (
					<TrackedUserRoute id={index} key={index} userId={user.userId} />
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
						<Marker coordinate={coordinates} style={{ height: 50 }}>
							<View style={Styles.coordinateBoxContainer}>
								<View style={Styles.coordinateBox}>
									<Text>
										{parseLatitude(coordinates.latitude)},{" "}
										{parseLongitude(coordinates.longitude)}
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

interface TrackedUserRouteProps {
	id: number;
	userId: string;
}

const TrackedUserRoute = ({ id, userId }: TrackedUserRouteProps) => {
	const [usersWaypoints, setUsersWaypoints] = useState<null | Waypoint[]>(null);

	const findUserRoute = async () => {
		setUsersWaypoints(null);
		const data = await getUsersLatestRoute(userId);
		if (!data) return <></>;
		const waypoints: Waypoint[] = data.waypoints.map(
			(waypoint: WaypointFromServer) => {
				return {
					...waypoint,
					routeId: waypoint.route_id,
				};
			}
		);
		setUsersWaypoints(waypoints);
		console.log(`...Users route ID: ${data.routeId} found.`);
		console.log(
			`Route is: ${data.active}. Number of waypoints stored: ${data.waypoints.length}`
		);
	};

	useEffect(() => {
		findUserRoute();
	}, []);

	return (
		<>
			{usersWaypoints ? (
				<>
					<Polyline
						coordinates={usersWaypoints}
						strokeColor={colors[id]}
						strokeWidth={4}
						zIndex={2}
					/>
					<Polyline
						coordinates={usersWaypoints}
						strokeColor="black"
						strokeWidth={8}
						zIndex={1}
					/>
					<View>
						<Marker
							coordinate={{
								latitude: usersWaypoints[usersWaypoints.length - 1]
									? usersWaypoints[usersWaypoints.length - 1].latitude
									: 60.204662,
								longitude: usersWaypoints[usersWaypoints.length - 1]
									? usersWaypoints[usersWaypoints.length - 1].longitude
									: 24.962535,
							}}
						>
							<View
								style={{
									...Styles.trackedUserDot,
									backgroundColor: colors[id],
								}}
							/>
						</Marker>
					</View>
				</>
			) : (
				<></>
			)}
		</>
	);
};

export default MapViewContainer;
