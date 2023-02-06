import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { AppDispatch, ReduxState } from "../store";
import { createNewUser } from "../requests";
import { User } from "../types";
import { restartBackgroundUpdate } from "../utils/location-tracking";

const initialState: User = {
	userId: null,
	trackingInterval: 5000,
	sendingInterval: 15000,
	mapLifetime: 48,
	offlineMode: false,
};
const userSlice = createSlice({
	name: "user",
	initialState,
	reducers: {
		setUser(state, action: PayloadAction<string | null>) {
			return { ...state, userId: action.payload };
		},
		setTrackingInterval(state, action: PayloadAction<number>) {
			return { ...state, trackingInterval: action.payload };
		},
		setSendingInterval(state, action: PayloadAction<number>) {
			console.log("Setting new sendingInterval to", action.payload);
			return { ...state, sendingInterval: action.payload };
		},
		setMapLifetime(state, action: PayloadAction<number>) {
			return { ...state, mapLifetime: action.payload };
		},
		setDefaultSettings(_state, action: PayloadAction<string | null>) {
			return { ...initialState, userId: action.payload };
		},
	},
});

export const {
	setUser,
	setTrackingInterval,
	setSendingInterval,
	setMapLifetime,
	setDefaultSettings,
} = userSlice.actions;

/**
 * Function to identify user. Creates new user by using http request unless
 * user has been already created and stored into the device.
 * @returns dispatch method to update user state
 */
export const identifyUser = () => {
	return async (dispatch: AppDispatch, getState: () => ReduxState) => {
		console.log("Identifying user...");
		const userId = getState().user.userId;
		if (userId !== null) {
			console.log(`user id found from storage ${userId}\n`);
		} else {
			console.log(`user id not found from storage, creating new user`);
			const data = await createNewUser();
			console.log(`recieved user id for a new user ${data.id}\n`);
			dispatch(setUser(data.id));
		}
	};
};

/**
 * For testing to easily reset reset user state which is already stored into device.
 * @returns dispatch method to update user state
 */
export const resetUser = () => {
	return async (dispatch: AppDispatch) => {
		console.log("Reseting user...");
		dispatch(setUser(null));
	};
};

/**
 * Changing waypoint tracking interval in the settings (src/screens/settings-screen.tsx).
 * @param newInterval new tracking interval in seconds
 * @returns dispatch method to update tracking interval.
 */
export const changeTrackingInterval = (newInterval: number) => {
	return async (dispatch: AppDispatch) => {
		console.log(`\nSetting new trackingInterval to ${newInterval / 1000} s`);
		dispatch(setTrackingInterval(newInterval));
		restartBackgroundUpdate(newInterval);
	};
};

/**
 * Changing waypoint sending interval to server in the settings (src/screens/settings-screen.tsx).
 * @param newInterval new sending interval in seconds
 * @returns dispatch method to update sending interval.
 */
export const changeSendingInterval = (newInterval: number) => {
	return async (dispatch: AppDispatch) => {
		console.log(`\nSetting new sendingInterval to ${newInterval / 1000} s\n`);
		dispatch(setSendingInterval(newInterval));
	};
};

/**
 * Change map tile cache lifetime in the settings
 * @param newLifetime in hours
 * @returns dispatch method to update map life time
 */
export const changeMapLifetime = (newLifetime: number) => {
	return async (dispatch: AppDispatch) => {
		console.log(`Map cache lifetime changed into ${newLifetime} hours`);
		dispatch(setMapLifetime(newLifetime));
	};
};

/**
 * Change default user settings such as intervals and map life time in the settings.
 * User ID remains the same.
 * @returns dispatch method to change default settings
 */
export const changeDefaultSettings = () => {
	return async (dispatch: AppDispatch, getState: () => ReduxState) => {
		const userId = getState().user.userId;
		console.log("Setting reset to default");
		dispatch(setDefaultSettings(userId));
		const trackingInterval = getState().user.trackingInterval;
		restartBackgroundUpdate(trackingInterval);
	};
};

export default userSlice.reducer;
