import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { AppDispatch } from "../store";
import { TrackedUser } from "../types";

const trackedUsersSlice = createSlice({
	initialState: {},
	name: "trackedUsers",
	reducers: {
		addNewTrackedUser(state, action: PayloadAction<TrackedUser>) {
			return {
				...state,
				[action.payload.userId]: action.payload,
			};
		},
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		clearState(state) {
			return {};
		},
	},
});

export const { addNewTrackedUser, clearState } = trackedUsersSlice.actions;

export const addTrackedUser = (newUser: TrackedUser) => {
	return async (dispatch: AppDispatch) => {
		dispatch(addNewTrackedUser(newUser));
	};
};

export default trackedUsersSlice.reducer;
