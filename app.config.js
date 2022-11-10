import "dotenv/config";

export default {
	name: "Berry picker tracker",
	slug: "berry-picker-tracker",
	entryPoint: "./index.js",
	version: "1.0.0",
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
		infoPlist: {
			UIBackgroundModes: ["location", "fetch"],
			NSLocationAlwaysAndWhenInUseUsageDescription: "App requires geolocation",
		},
	},
	android: {
		package: "com.berry.picker.tracker",
		versionCode: 1,
		adaptiveIcon: {
			foregroundImage: "./assets/adaptive-icon.png",
			backgroundColor: "#FFFFFF",
		},
	},
	web: {
		favicon: "./assets/favicon.png",
	},
	extra: {
		uri: process.env.URI,
		eas: {
			projectId: process.env.PROJECT_ID,
		},
	},
};
