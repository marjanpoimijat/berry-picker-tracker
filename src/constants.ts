import Constants from "expo-constants";

export const baseUrl: string =
	Constants?.manifest?.extra?.uri ??
	"http://berry-picker-tracker.cs.helsinki.fi";

export const statusBarHeight: number = Constants.statusBarHeight;
