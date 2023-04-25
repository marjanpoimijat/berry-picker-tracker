import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { AppDispatch, ReduxState } from "../store";
import { createNewUser } from "../requests";
import { User } from "../types";
import { restartBackgroundUpdate } from "../utils/location-tracking";
import { generateKeyString } from "../utils/crypto";
import { secureStoreAddCryptoKey, secureStoreDeleteCryptoKey } from "../utils/secure-store";

const initialState: User = {
	mapLifetime: 48,
	offlineMode: false,
	refreshingFrequency: 10000,
	sendingInterval: 15000,
	trackingFrequency: 5000,
	userId: null,
	username: "",
};

const userSlice = createSlice({
	initialState: initialState,
	name: "user",
	reducers: {
		setDefaultSettings(_state, action: PayloadAction<string | null>) {
			return { ...initialState, userId: action.payload };
		},
		setMapLifetime(state, action: PayloadAction<number>) {
			return { ...state, mapLifetime: action.payload };
		},
		setRefreshingFrequency(state, action: PayloadAction<number>) {
			return { ...state, refreshingFrequency: action.payload };
		},
		setSendingInterval(state, action: PayloadAction<number>) {
			console.log("Setting new sendingInterval to", action.payload);
			return { ...state, sendingInterval: action.payload };
		},
		setTrackingFrequency(state, action: PayloadAction<number>) {
			return { ...state, trackingFrequency: action.payload };
		},
		setUser(state, action: PayloadAction<string | null>) {
			return { ...state, userId: action.payload };
		},
		setUsername(state, action: PayloadAction<string>) {
			return { ...state, username: action.payload };
		},
	},
});

export const {
	setUser,
	setUsername,
	setRefreshingFrequency,
	setTrackingFrequency: setTrackingFrequency,
	setSendingInterval,
	setMapLifetime,
	setDefaultSettings,
} = userSlice.actions;

/**
 * Function to identify user. Creates new user by using http request unless
 * user has been already created and stored into the device.
 *
 * @returns {AppDispatch} Dispatch method to update user state.
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
			const cryptoKey = generateKeyString(16);
			await secureStoreAddCryptoKey(cryptoKey);
		}
	};
};

/**
 * For testing to easily reset reset user state which is already stored into device.
 *
 * @returns {AppDispatch} Dispatch method to update user state.
 */
export const resetUser = () => {
	return async (dispatch: AppDispatch, getState: () => ReduxState) => {
		console.log("Reseting user...");
		const userId = getState().user.userId;
		dispatch(setUser(null));
		if (userId !== null) {
			//deleteUser(userId);
			await secureStoreDeleteCryptoKey();
		}
	};
};

/**
 * Changing routes refreshing interval in the settings menu.
 *
 * @param {number} newInterval New tracking interval in seconds.
 * @returns {AppDispatch} Dispatch method to update tracking interval.
 */
export const changeRefreshingFrequency = (newInterval: number) => {
	return async (dispatch: AppDispatch) => {
		console.log(`\nSetting new refresingInterval to ${newInterval / 1000} s`);
		dispatch(setRefreshingFrequency(newInterval));
	};
};

/**
 * Changing waypoint tracking interval in the settings (src/screens/settings-screen.tsx).
 *
 * @param {number} newInterval New tracking interval in seconds.
 * @returns {AppDispatch} Dispatch method to update tracking interval.
 */
export const changeTrackingFrequency = (newInterval: number) => {
	return async (dispatch: AppDispatch) => {
		console.log(`\nSetting new trackingFrequency to ${newInterval / 1000} s`);
		dispatch(setTrackingFrequency(newInterval));
		restartBackgroundUpdate(newInterval);
	};
};

/**
 * Changing waypoint sending interval to server in the settings (src/screens/settings-screen.tsx).
 *
 * @param {number} newInterval New sending interval in seconds.
 * @returns {AppDispatch} Dispatch method to update sending interval.
 */
export const changeSendingInterval = (newInterval: number) => {
	return async (dispatch: AppDispatch) => {
		console.log(`\nSetting new sendingInterval to ${newInterval / 1000} s\n`);
		dispatch(setSendingInterval(newInterval));
	};
};

/**
 * Change map tile cache lifetime in the settings.
 *
 * @param {number} newLifetime New lifetime in hours.
 * @returns {AppDispatch} Dispatch method to update map life time.
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
 *
 * @returns {AppDispatch} Dispatch method to change default settings.
 */
export const changeDefaultSettings = () => {
	return async (dispatch: AppDispatch, getState: () => ReduxState) => {
		const userId = getState().user.userId;
		console.log("Setting reset to default");
		dispatch(setDefaultSettings(userId));
		const trackingFrequency = getState().user.trackingFrequency;
		restartBackgroundUpdate(trackingFrequency);
	};
};

export default userSlice.reducer;
