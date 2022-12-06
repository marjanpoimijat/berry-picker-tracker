import "dotenv/config";
import theme from "./src/theme";

export default {
	name: "Berry picker tracker",
	slug: "berry-picker-tracker",
	entryPoint: "./index.js",
	version: "1.0.11",
	orientation: "portrait",
	icon: "./assets/icon.png",
	splash: {
		image: "./assets/splash.png",
		resizeMode: "contain",
		backgroundColor: "#ffffff",
	},
	updates: {
		fallbackToCacheTimeout: 0,
	},
	assetBundlePatterns: ["**/*"],
	ios: {
		bundleIdentifier: "com.berry.picker.tracker",
		supportsTablet: true,
		buildNumber: "12",
		infoPlist: {
			UIBackgroundModes: ["location", "fetch"],
			NSLocationAlwaysAndWhenInUseUsageDescription: "App requires geolocation",
		},
	},
	android: {
		package: "com.berry.picker.tracker",
		versionCode: 12,
		adaptiveIcon: {
			foregroundImage: "./assets/adaptive-icon.png",
			backgroundColor: "#FFFFFF",
		},
		softwareKeyboardLayoutMode: "pan",
		config: {
			googleMaps: {
				apiKey: process.env.MAPS_API,
			},
		},
	},
	// androidStatusBar: {
	// 	barStyle: "light-content",
	// 	backgroundColor: theme.colors.primaryBackgroundColor,
	// },
	web: {
		favicon: "./assets/favicon.png",
	},
	plugins: [
		[
			"expo-build-properties",
			{
				android: {
					compileSdkVersion: 31,
					targetSdkVersion: 31,
					buildToolsVersion: "31.0.0",
				},
				ios: {
					deploymentTarget: "13.0",
				},
			},
		],
	],
	extra: {
		uri: process.env.URI,
		eas: {
			projectId: process.env.PROJECT_ID,
		},
	},
};
