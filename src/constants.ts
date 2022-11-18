import Constants from "expo-constants";
import * as FileSystem from "expo-file-system";
import { StatusBar } from "react-native";

export const baseUrl: string =
	Constants?.manifest?.extra?.uri ??
	"http://berry-picker-tracker.cs.helsinki.fi:88";

export const statusBarHeight: number =
	StatusBar.currentHeight ?? Constants.statusBarHeight;

export const tileCacheDirectory = FileSystem.cacheDirectory + "tiles/";
