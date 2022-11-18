import "dotenv/config";

export default {
	name: "Berry picker tracker",
	slug: "berry-picker-tracker",
	entryPoint: "./index.js",
	version: "1.0.8",
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
		buildNumber: "9",
		infoPlist: {
			UIBackgroundModes: ["location", "fetch"],
			NSLocationAlwaysAndWhenInUseUsageDescription: "App requires geolocation",
		},
	},
	android: {
		package: "com.berry.picker.tracker",
		versionCode: 9,
		adaptiveIcon: {
			foregroundImage: "./assets/adaptive-icon.png",
			backgroundColor: "#FFFFFF",
		},
		config: {
			googleMaps: {
				apiKey: process.env.MAPS_API,
			},
		},
	},
	androidStatusBar: {
		barStyle: "light-content",
		backgroundColor: "#333C4A",
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
