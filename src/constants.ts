/* eslint-disable max-len */
import Constants from "expo-constants";
import * as FileSystem from "expo-file-system";
import { Platform } from "react-native";

export const baseUrl: string = Constants?.manifest?.extra?.uri ?? "https://berry-picker-tracker.cs.helsinki.fi/dev";

// This one is needed for the EAS CLI build
export const statusBarHeight: number =
	Platform.OS === "ios" ? Constants.statusBarHeight : Platform.OS === "android" ? Constants.statusBarHeight : 0;

export const navigatorTabHeight = 70;

// This one is needed for the Expo Go
// export const statusBarHeight: number = Constants.statusBarHeight;

export const tileCacheDirectory = FileSystem.cacheDirectory + "tiles/";

export const version = Constants?.manifest?.version ?? "1.0.0";

export const legendLink =
	"https://www.maanmittauslaitos.fi/sites/maanmittauslaitos.fi/files/attachments/2020/01/karttamerkkien_selitys.pdf";

export const repoBaseUrl = "https://github.com/marjanpoimijat";
