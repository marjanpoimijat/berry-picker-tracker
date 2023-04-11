import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
	mapMenuVisible: false,
	myRoutesMenuVisible: false,
	settingsMenuVisible: false,
	trackingMenuVisible: false,
};

const uiSlice = createSlice({
	initialState: initialState,
	name: "ui",
	reducers: {
		setMapMenuVisible(state, action: PayloadAction<boolean>) {
			return {
				...state,
				myRoutesMenuVisible: action.payload,
				settingsMenuVisible: false,
				trackingMenuVisible: false,
			};
		},
		setMyRoutesMenuVisible(state, action: PayloadAction<boolean>) {
			return {
				...state,
				myRoutesMenuVisible: action.payload,
				settingsMenuVisible: false,
				trackingMenuVisible: false,
			};
		},
		setSettingsMenuVisible(state, action: PayloadAction<boolean>) {
			return {
				...state,
				myRoutesMenuVisible: false,
				settingsMenuVisible: action.payload,
				trackingMenuVisible: false,
			};
		},
		setTrackingMenuVisible(state, action: PayloadAction<boolean>) {
			return {
				...state,
				myRoutesMenuVisible: false,
				settingsMenuVisible: false,
				trackingMenuVisible: action.payload,
			};
		},
	},
});

export const { setMapMenuVisible, setMyRoutesMenuVisible, setTrackingMenuVisible, setSettingsMenuVisible } =
	uiSlice.actions;

export default uiSlice.reducer;
