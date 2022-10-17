import { useState, useEffect, useRef } from "react";
import { View, StyleSheet } from "react-native";
import { LatLng } from "react-native-maps";
import * as Location from "expo-location";
import * as Cellular from "expo-cellular";
import { LocationObject } from "expo-location";
import AppHeader from "../components/app-header";
import MapViewContainer from "../components/map-view-container";
import RouteButtonContainer from "../components/route-button-container";
import InfoContainer from "../components/info-container";
import useIdentifyUser from "../hooks/use-identify-user";
import useRoutes from "../hooks/use-routes";
import NavigatorTab from "../components/navigator-tab";

const MapScreen = () => {
	const [, setErrorMsg] = useState<string | null>(null);
	const [curLocation, setCurLocation] = useState<LocationObject | null>(null);
	const [mobileNetCode, setMobileNetCode] = useState<string | null>(null);
	const [routeCoordinates, setRouteCoordinates] = useState<Array<LatLng>>([]);
	const [tempWaypoints, setTempWaypoints] = useState<
		Array<null | {
			routeId: string;
			location: Location.LocationObject;
			mobileNetCode: string;
		}>
	>([]);
	const [showRoute, setShowRoute] = useState<boolean>(true);
	const [trackingInterval] = useState<number>(2500);
	const [sendingInterval] = useState<number>(15000);
	const [isTracking, setIsTracking] = useState<boolean>(false);
	const [userId, setUserId] = useState<string | null>(null);
	const [routeId, setRouteId] = useState<string | null>(null);
	const waypointUpdateRef = useRef<() => void>();
	const waypointSendRef = useRef<() => void>();
	const identifyUser = useIdentifyUser();
	const { startRoute, sendWaypoint, deactivateRoute } = useRoutes();

	/**
	 * Requests permissions to use device location.
	 * Gets device location and sets current location state if permissions is allowed.
	 * Otherwise sets error message state which is not currently used anywhere.
	 * Also gets cellular network operators MNC (Mobile Network Code), identifies user and sets user ID state.
	 * MNC code is a null if SIM card is not at the device or there is no cellular service available.
	 */
	useEffect(() => {
		(async () => {
			const { status } = await Location.requestForegroundPermissionsAsync();
			if (status !== "granted") {
				setErrorMsg("Permission to access location was denied");
				return;
			}
			const location = await Location.getCurrentPositionAsync({});
			setCurLocation(location);
			const networkCode = await Cellular.getMobileNetworkCodeAsync();
			setMobileNetCode(networkCode);
			const uid = await identifyUser();
			setUserId(uid);
		})();
	}, []);

	/**
	 * Gets devices last known location and MNC code, updates corresponding states and appends
	 * the coordinate points (latitude/longitude) into route coordinates state using the
	 * `AddNewRouteCoordinate()` function. Creates a waypoint constant and adds it to the temporary
	 * list of waypoints ready to be sent to the server.
	 */
	const updateWaypoint: () => void = async () => {
		const location = await Location.getLastKnownPositionAsync({});
		setCurLocation(location);
		addNewRouteCoordinate(location);
		const networkCode = await Cellular.getMobileNetworkCodeAsync();
		setMobileNetCode(networkCode);
		const waypoint = {
			routeId,
			location,
			mobileNetCode,
		};
		setTempWaypoints((tempWaypoints) => tempWaypoints.concat(waypoint));
		console.log("temporary waypoints:", tempWaypoints.length);
	};

	/**
	 * Function to send waypointlist to the server. Sending is done with a set interval: @sendingInterval
	 * Current functionality: Checks if device is connected, resets waypointlist.
	 * TODO: Send waypointlist if connectivity is becoming bad.
	 */
	const sendWaypointToServer: () => void = async () => {
		if (mobileNetCode != null) {
			await sendWaypoint(tempWaypoints);
			console.log("sent waypoints to server");
			setTempWaypoints([]);
		}
	};

	/**
	 * Updates waypoint using the interval of tracking interval state if
	 * @isTracking has been set to true. Otherwise do not update.
	 */
	useEffect(() => {
		waypointUpdateRef.current = updateWaypoint;
	}, [updateWaypoint]);

	useEffect(() => {
		function tick() {
			waypointUpdateRef.current();
		}
		if (isTracking) {
			const upd_id = setInterval(tick, trackingInterval);
			return () => clearInterval(upd_id);
		}
	}, [isTracking]);

	/**
	 * Sets a ticking interval for sending waypoint to the server if
	 * @isTracking has been set to true.
	 */
	useEffect(() => {
		waypointSendRef.current = sendWaypointToServer;
	}, [sendWaypointToServer]);

	useEffect(() => {
		function tick() {
			waypointSendRef.current();
		}
		if (isTracking) {
			const send_id = setInterval(tick, sendingInterval);
			return () => clearInterval(send_id);
		}
	}, [isTracking]);

	/**
	 * Creates coordinate object from the location object and appends coordinate into
	 * route coordinate state which contains list of previously stored coordinate objects.
	 * @param location object which contains latitude and longitude values.
	 */
	const addNewRouteCoordinate = (location: LocationObject | null) => {
		if (location !== null) {
			const coordinate = {
				latitude: location.coords.latitude,
				longitude: location.coords.longitude,
			};
			setRouteCoordinates(routeCoordinates.concat(coordinate));
		}
	};

	/**
	 * Changes tracking state and initializes route coordinate state with empty list.
	 * Needs to be reinvented later...
	 */
	const changeTracking = async () => {
		// Just to test storage / http request functionalities.
		if (!isTracking) {
			const uid = userId ? userId : await identifyUser();
			const rid = await startRoute(uid);
			setRouteId(rid);
		} else {
			await deactivateRoute();
			setRouteId(null);
		}
		setRouteCoordinates([]);
		setTempWaypoints([]);
		setIsTracking(!isTracking);
	};

	/**
	 * Changes show route state to opposite boolean ie. from true to false
	 * and vice versa.
	 */
	const changeShowRoute = () => {
		console.log(showRoute);
		setShowRoute(!showRoute);
	};

	return (
		<View style={styles.container}>
			<AppHeader name={"Berry picker tracker"} userId={userId} />
			<MapViewContainer
				showRoute={showRoute}
				routeCoordinates={routeCoordinates}
			/>
			<RouteButtonContainer
				changeTracking={changeTracking}
				changeShowRoute={changeShowRoute}
				showRoute={showRoute}
				isTracking={isTracking}
			/>
			<InfoContainer
				curLocation={curLocation}
				mobileNetCode={mobileNetCode}
				routeCoordinates={routeCoordinates}
				routeId={routeId}
			/>
			<NavigatorTab />
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
		alignItems: "center",
		justifyContent: "flex-start",
		flexDirection: "column",
	},
});

export default MapScreen;
