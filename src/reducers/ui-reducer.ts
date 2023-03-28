import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
	myRoutesMenuVisible: false,
	settingsMenuVisible: false,
	trackingMenuVisible: false,
};

const uiSlice = createSlice({
	initialState: initialState,
	name: "ui",
	reducers: {
		setMyRoutesMenuVisible(state, action: PayloadAction<boolean>) {
			return {
				...state,
				myRoutesMenuVisible: action.payload,
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

export const { setMyRoutesMenuVisible, setTrackingMenuVisible, setSettingsMenuVisible } = uiSlice.actions;

export default uiSlice.reducer;
