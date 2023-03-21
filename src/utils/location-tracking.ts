import * as TaskManager from "expo-task-manager";
import * as Location from "expo-location";
import { storeAndSendWaypoints } from "../reducers/waypoint-reducer";
import { AppDispatch } from "../store";
import theme from "../styles/theme";

const TRACK_WAYPOINTS = "track_waypoints";
const locationTaskOptions = {
	accuracy: Location.Accuracy.BestForNavigation, //NB! Altering this may affect for the interval
	activityType: Location.ActivityType.Fitness,
	foregroundService: {
		notificationBody: "End current route tracking in order to close the app",
		notificationColor: theme.colors.primaryBackgroundColor,
		notificationTitle: "Berry picker tracker is running on a background",
	},
	showsBackgroundLocationIndicator: true,
};

/**
 * Defines background task for location tracking. When task is running
 * checks if location data has been optained and call dispatch method
 * which handles storing, sending and updating waypoint data.
 * **Note**: Currently location data from background task is not passed via dispatch
 * method. Instead of that, dispatch method will retrieve the data used to create new waypoint.
 * @param dispatch dispatch method to update `WaypointState`
 */
export const defineBackgroundLocationTask = (dispatch: AppDispatch) => {
	console.log("defining background location task \n");
	TaskManager.defineTask(TRACK_WAYPOINTS, async ({ data, error }) => {
		if (error) {
			console.error(error);
			return;
		}
		if (data) {
			dispatch(storeAndSendWaypoints());
		}
	});
};

/**
 * Requests permissions from the user to use foreground and background
 * location tasks.
 */
export const requestPermissions = async () => {
	console.log("requesting foreground permission...");
	const { status } = await Location.requestForegroundPermissionsAsync();
	if (status === "granted") {
		console.log("...foreground permission granted");
		console.log("requesting background permission...");
		const { status } = await Location.requestBackgroundPermissionsAsync();
		if (status === "granted") {
			console.log("...background permission granted");
		} else {
			console.log("...background permission denied");
		}
	} else {
		console.log("...foreground permissien denied");
	}
	console.log(" ");
};

/**
 * Starts background task for location tracking.
 * @param trackingInterval minimum interval how often background task will be executed
 */
export const startBackgroundUpdate = async (trackingInterval: number) => {
	await Location.startLocationUpdatesAsync(TRACK_WAYPOINTS, {
		...locationTaskOptions,
		timeInterval: trackingInterval,
	});
};

export const restartBackgroundUpdate = async (trackingInterval: number) => {
	const trackingActive = await Location.hasStartedLocationUpdatesAsync(TRACK_WAYPOINTS);
	if (trackingActive) {
		console.log(`Restarting background location updates with new tracking interval ${trackingInterval / 1000} s\n`);
		await Location.stopLocationUpdatesAsync(TRACK_WAYPOINTS);
		await Location.startLocationUpdatesAsync(TRACK_WAYPOINTS, {
			...locationTaskOptions,
			timeInterval: trackingInterval,
		});
	}
};

/**
 * Stops background task for location tracking if it is currently running.
 */
export const stopBackgroundUpdate = async () => {
	const trackingActive = await Location.hasStartedLocationUpdatesAsync(TRACK_WAYPOINTS);
	if (trackingActive) {
		await Location.stopLocationUpdatesAsync(TRACK_WAYPOINTS);
		console.log("Background location tracking has been ended");
	}
};
