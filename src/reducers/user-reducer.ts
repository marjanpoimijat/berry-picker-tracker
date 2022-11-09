import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { AppDispatch, ReduxState } from "../store";
import { createNewUser } from "../requests";
import { User } from "../types";

const initialState: User = {
	userId: null,
	trackingInterval: 2500,
	sendingInterval: 15000,
};
const userSlice = createSlice({
	name: "user",
	initialState,
	reducers: {
		setUser(state, action: PayloadAction<string | null>) {
			return { ...state, userId: action.payload };
		},
	},
});

export const { setUser } = userSlice.actions;

/**
 * Function to identify user. Creates new user by using http request unless
 * user has been already created and stored into the device.
 * @returns dispatch method to update user state
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
		}
	};
};

/**
 * For testing to easily reset reset user state which is already stored into device.
 * @returns dispatch method to update user state
 */
export const resetUser = () => {
	return async (dispatch: AppDispatch) => {
		console.log("Reseting user...");
		dispatch(setUser(null));
	};
};

export default userSlice.reducer;