import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { AppDispatch } from "../store";

const initialState = "";

const userIdSlice = createSlice({
	initialState: initialState,
	name: "userId",
	reducers: {
		setUserId(state, action: PayloadAction<string>) {
			return action.payload;
		},
	},
});

export const { setUserId } = userIdSlice.actions;

export const changeUserId = (newUserId: string) => {
	return async (dispatch: AppDispatch) => {
		console.log("Changing userID to:", newUserId);
		dispatch(setUserId(newUserId));
	};
};

export default userIdSlice.reducer;
