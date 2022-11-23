import Constants from "expo-constants";
import * as FileSystem from "expo-file-system";
//import { Platform } from "react-native";

export const baseUrl: string =
	Constants?.manifest?.extra?.uri ??
	"http://berry-picker-tracker.cs.helsinki.fi:88";

// This one is needed for the android build
// export const statusBarHeight: number =
// 	Platform.OS === "ios" ? Constants.statusBarHeight : 0;

// This one is needed for the Expo Go
export const statusBarHeight: number = Constants.statusBarHeight;

export const tileCacheDirectory = FileSystem.cacheDirectory + "tiles/";

export const version = Constants?.manifest?.version ?? "1.0.0";
