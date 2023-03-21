import "dotenv/config";

export default {
	android: {
		adaptiveIcon: {
			backgroundColor: "#FFFFFF",
			foregroundImage: "./assets/adaptive-icon.png",
		},
		config: {
			googleMaps: {
				apiKey: process.env.MAPS_API,
			},
		},
		package: "com.berryPickerTracker",
		softwareKeyboardLayoutMode: "pan",
		versionCode: 18,
	},
	androidStatusBar: {
		backgroundColor: "#388e3c",
		barStyle: "light-content",
	},
	assetBundlePatterns: ["**/*"],
	extra: {
		eas: {
			projectId: process.env.PROJECT_ID,
		},
		uri: process.env.URI,
	},
	icon: "./assets/icon.png",
	ios: {
		buildNumber: "18",
		bundleIdentifier: "com.berryPickerTracker",
		infoPlist: {
			LSApplicationQueriesSchemes: ["bpt"],
			NSLocationAlwaysAndWhenInUseUsageDescription: "App requires geolocation",
			UIBackgroundModes: ["location", "fetch"],
		},
		supportsTablet: true,
	},
	name: "Berry picker tracker",
	orientation: "portrait",
	plugins: [
		[
			"expo-build-properties",
			{
				android: {
					buildToolsVersion: "31.0.0",
					compileSdkVersion: 31,
					targetSdkVersion: 31,
				},
				ios: {
					deploymentTarget: "13.0",
				},
			},
		],
	],
	scheme: "bpt",
	slug: "berry-picker-tracker",
	splash: {
		backgroundColor: "#cdf5b6",
		image: "./assets/splash2.png",
		resizeMode: "contain",
	},
	updates: {
		fallbackToCacheTimeout: 0,
	},
	version: "1.1.3",
	web: {
		favicon: "./assets/favicon.png",
	},
};
