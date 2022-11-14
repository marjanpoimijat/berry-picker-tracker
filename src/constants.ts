import Constants from "expo-constants";
import * as FileSystem from "expo-file-system";

export const baseUrl: string =
	Constants?.manifest?.extra?.uri ??
	"http://berry-picker-tracker.cs.helsinki.fi:88";

export const statusBarHeight: number = Constants.statusBarHeight;

export const tileCacheDirectory = FileSystem.cacheDirectory + "tiles/";
