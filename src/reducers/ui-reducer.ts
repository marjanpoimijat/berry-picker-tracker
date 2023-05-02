import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
	mapMenuVisible: false,
	myRoutesMenuVisible: false,
	routeButtonToggled: true,
	settingsMenuVisible: false,
	showButtonToggled: true,
	trackingMenuVisible: false,
};

const uiSlice = createSlice({
	initialState: initialState,
	name: "ui",
	reducers: {
		setMapMenuVisible(state, action: PayloadAction<boolean>) {
			return {
				...state,
				mapMenuVisible: action.payload,
				myRoutesMenuVisible: false,
				settingsMenuVisible: false,
				trackingMenuVisible: false,
			};
		},
		setMyRoutesMenuVisible(state, action: PayloadAction<boolean>) {
			return {
				...state,
				mapMenuVisible: false,
				myRoutesMenuVisible: action.payload,
				settingsMenuVisible: false,
				trackingMenuVisible: false,
			};
		},
		setSettingsMenuVisible(state, action: PayloadAction<boolean>) {
			return {
				...state,
				mapMenuVisible: false,
				myRoutesMenuVisible: false,
				settingsMenuVisible: action.payload,
				trackingMenuVisible: false,
			};
		},
		setTrackingMenuVisible(state, action: PayloadAction<boolean>) {
			return {
				...state,
				mapMenuVisible: false,
				myRoutesMenuVisible: false,
				settingsMenuVisible: false,
				trackingMenuVisible: action.payload,
			};
		},
		toggleRouteMasterButton(state, action: PayloadAction<boolean>) {
			return {
				...state,
				routeButtonToggled: action.payload,
			};
		},
		toggleShowMasterButton(state, action: PayloadAction<boolean>) {
			return {
				...state,
				showButtonToggled: action.payload,
			};
		},
	},
});

export const {
	setMapMenuVisible,
	setMyRoutesMenuVisible,
	setTrackingMenuVisible,
	setSettingsMenuVisible,
	toggleRouteMasterButton,
	toggleShowMasterButton,
} = uiSlice.actions;

export default uiSlice.reducer;
