import "dotenv/config";
// build with
// eas build -p android -e apk
export default {
	expo: {
		extra: {
			eas: {
				projectId: process.env.PROJECT_ID,
			},
			uri: process.env.URI,
		},
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
			package: "com.berrypickertracker",
			softwareKeyboardLayoutMode: "pan",
			versionCode: 18,
		},
		androidStatusBar: {
			backgroundColor: "#388e3c",
			barStyle: "light-content",
		},
		assetBundlePatterns: ["**/*"],

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
						buildToolsVersion: "33.0.0",
						compileSdkVersion: 33,
						targetSdkVersion: 33,
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
			resizeMode: "native",
		},
		updates: {
			fallbackToCacheTimeout: 0,
		},
		version: "1.1.3",
		web: {
			favicon: "./assets/favicon.png",
		},
	},
};
