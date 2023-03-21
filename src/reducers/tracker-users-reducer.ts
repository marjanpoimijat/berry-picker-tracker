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
		removeTrackedUser(state, action: PayloadAction<string>) {
			const newState = { ...state };
			delete newState[action.payload];
			return newState;
		},
		updateTrackedUser(state, action: PayloadAction<TrackedUser>) {
			const updatedState = Object.assign({}, state, {
				[action.payload.userId]: action.payload,
			});
			return updatedState;
		},
	},
});

export const { addTrackedUser, updateTrackedUser, removeTrackedUser } = trackedUsersSlice.actions;

export default trackedUsersSlice.reducer;
