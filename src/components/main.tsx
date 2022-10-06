import { useState, useEffect, useRef } from "react";
import { View, StyleSheet } from "react-native";
import { LatLng } from "react-native-maps";
import * as Location from "expo-location";
import * as Cellular from "expo-cellular";
import { LocationObject } from "expo-location";

import AppHeader from "./app-header";
import MapViewContainer from "./map-view-container";
import RouteButtonContainer from "./route-button-container";
import InfoContainer from "./info-container";
import NavigatorTab from "./navigator-tab";
import useIdentifyUser from "../hooks/use-identify-user";
import useRoutes from "../hooks/use-routes";

const Main = () => {
	const [, setErrorMsg] = useState<string | null>(null);
	const [curLocation, setCurLocation] = useState<LocationObject | null>(null);
	const [mobileNetCode, setMobileNetCode] = useState<string | null>(null);
	const [routeCoordinates, setRouteCoordinates] = useState<Array<LatLng>>([]);
	const [showRoute, setShowRoute] = useState<boolean>(true);
	const [trackingInterval] = useState<number>(1000);
	const [isTracking, setIsTracking] = useState<boolean>(false);
	const [tripId, setTripId] = useState<string | null>(null);
	const trackingInfoRef = useRef<() => void>();
	const identifyUser = useIdentifyUser();

	//Incomplete, just for testing
	const { startRoute } = useRoutes();

	/**
	 * Requests permissions to use device location.
	 * Gets device location and sets current location state if permissions is allowed.
	 * Otherwise sets error message state which is not currently used anywhere.
	 * Also cellular network operators MNC (Mobile Network Code) and sets network code state
	 * using the interval according to the network code interval state.
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
		})();
	}, []);

	/**
	 * Gets devices last known location and MNC code, updates corresponding states and appends
	 * the coordinate points (latitude/longitude) into route coordinates state using the
	 * `AddNewRouteCoordinate()`function.
	 */
	const updateTrackingInfo: () => void = async () => {
		const location = await Location.getLastKnownPositionAsync({});
		setCurLocation(location);
		addNewRouteCoordinate(location);
		const networkCode = await Cellular.getMobileNetworkCodeAsync();
		setMobileNetCode(networkCode);
	};

	/**
	 * Updates tracking info using the interval of tracking interval state if
	 * is tracking state has been set to true. Otherwise do not update.
	 */
	useEffect(() => {
		trackingInfoRef.current = updateTrackingInfo;
	}, [updateTrackingInfo]);

	useEffect(() => {
		function tick() {
			trackingInfoRef.current();
		}
		if (isTracking) {
			const id = setInterval(tick, trackingInterval);
			return () => clearInterval(id);
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
	 * Changes tracking state, initializes route coordinate state with empty list
	 * and sets trip id to string when tracking has started and to null when tracking
	 * has ended.
	 */
	const changeTracking = async () => {
		//Incomplete, just for testing
		const userId = await identifyUser();
		const routeId = await startRoute(userId);
		setRouteCoordinates([]);
		setIsTracking(!isTracking);
		setTripId(routeId);
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
			<AppHeader name={"Berry picker tracker"} />
			<MapViewContainer
				showRoute={showRoute}
				routeCoordinates={routeCoordinates}
			/>
			<RouteButtonContainer
				changeTracking={changeTracking}
				changeShowRoute={changeShowRoute}
				showRoute={showRoute}
				isTracking={isTracking}
				tripId={tripId}
			/>
			<InfoContainer
				curLocation={curLocation}
				mobileNetCode={mobileNetCode}
				routeCoordinates={routeCoordinates}
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

export default Main;
