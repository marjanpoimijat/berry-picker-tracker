import Constants from "expo-constants";

export const baseUrl: string =
	Constants?.manifest?.extra?.uri ??
	"http://berry-picker-tracker.cs.helsinki.fi:88";

export const statusBarHeight: number = Constants.statusBarHeight;
