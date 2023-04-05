import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TrackedUser, TrackedUsers, UserToUpdate } from "../types";

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
		updateTrackedUser(state, action: PayloadAction<UserToUpdate>) {
			const { locationVisible, routeVisible, userId } = action.payload;
			const userToUpdate = state[userId];
			if (!userToUpdate) return state;
			return {
				...state,
				[userId]: {
					...userToUpdate,
					locationVisible: locationVisible ?? userToUpdate.locationVisible,
					routeVisible: routeVisible ?? userToUpdate.routeVisible,
				},
			};
		},
	},
});

export const { addTrackedUser, removeAllTrackedUsers, removeTrackedUser, updateTrackedUser } =
	trackedUsersSlice.actions;

export default trackedUsersSlice.reducer;
