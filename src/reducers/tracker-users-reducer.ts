import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TrackedUser, TrackedUsers } from "../types";

const initialState: TrackedUsers = {};

const trackedUsersSlice = createSlice({
	initialState: initialState,
	name: "trackedUsers",
	reducers: {
		addTrackedUser(state, action: PayloadAction<TrackedUser>) {
			return {
				...state,
				[action.payload.userId]: action.payload,
			};
		},
		removeAllTrackedUsers() {
			return {};
		},
		removeTrackedUser(state, action: PayloadAction<string>) {
			const newState = { ...state };
			delete newState[action.payload];
			return newState;
		},
	},
});

export const { addTrackedUser, removeAllTrackedUsers, removeTrackedUser } = trackedUsersSlice.actions;

export default trackedUsersSlice.reducer;
