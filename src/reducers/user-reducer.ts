import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { AppDispatch } from "../store";
import { createNewUser } from "../requests";

const userSlice = createSlice({
	name: "user",
	initialState: null,
	reducers: {
		setUser(state, action: PayloadAction<string>) {
			console.log(`Setting user: ${action.payload}`);
			return action.payload;
		},
	},
});

export const { setUser } = userSlice.actions;

/**
 * Function to identify user. Creates new user by using http request unless
 * user has already created and the user id has been stored into the device.
 * @param userId
 * @returns dispatch method to update user state
 */
export const identifyUser = (userId: string | null) => {
	return async (dispatch: AppDispatch) => {
		console.log("Identifying user...");
		if (userId !== null) {
			console.log(`user id found from storage ${userId}`);
		} else {
			console.log(`user id not found from storage, creating new user`);
			const data = await createNewUser();
			console.log(`recieved user id for a new user ${data.id}`);
			dispatch(setUser(data.id));
		}
	};
};

/**
 * For testing to easily reset reset user ID which is already stored into device.
 * @returns dispatch method to update user state
 */
export const resetUser = () => {
	return async (dispatch: AppDispatch) => {
		console.log("Reseting user...");
		dispatch(setUser(null));
	};
};

export default userSlice.reducer;
