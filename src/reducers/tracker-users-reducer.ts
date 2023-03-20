import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { AppDispatch } from "../store";
import { TrackedUser } from "../../types";

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
		updateTrackedUser(state, action: PayloadAction<TrackedUser>) {
			const updatedState = Object.assign({}, state, {
				[action.payload.userId]: action.payload,
			});
			return updatedState;
		},
	},
});

export const { addNewTrackedUser } = trackedUsersSlice.actions;

export const addTrackedUser = (newUser: TrackedUser) => {
	return async (dispatch: AppDispatch) => {
		dispatch(addNewTrackedUser(newUser));
	};
};

export default trackedUsersSlice.reducer;
