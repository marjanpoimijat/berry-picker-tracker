import { createSlice } from "@reduxjs/toolkit";

const idSlice = createSlice({
	initialState: 0,
	name: "id",
	reducers: {
		increment(state) {
			return state + 1;
		},
	},
});

export const { increment } = idSlice.actions;

export default idSlice.reducer;
