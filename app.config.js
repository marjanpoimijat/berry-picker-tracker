import "dotenv/config";

export default {
	name: "Berry picker tracker",
	slug: "berry-picker-tracker",
	entryPoint: "./index.js",
	version: "1.1.3",
	orientation: "portrait",
	icon: "./assets/icon.png",
	splash: {
		image: "./assets/splash.png",
		resizeMode: "contain",
		backgroundColor: "#ffffff",
	},
	scheme: "bpt",
	updates: {
		fallbackToCacheTimeout: 0,
	},
	assetBundlePatterns: ["**/*"],
	ios: {
		bundleIdentifier: "com.berryPickerTracker",
		supportsTablet: true,
		buildNumber: "18",
		infoPlist: {
			UIBackgroundModes: ["location", "fetch"],
			NSLocationAlwaysAndWhenInUseUsageDescription: "App requires geolocation",
			LSApplicationQueriesSchemes: ["bpt"],
		},
	},
	android: {
		package: "com.berryPickerTracker",
		versionCode: 18,
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
	androidStatusBar: {
		barStyle: "light-content",
		backgroundColor: "#388e3c",
	},
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
