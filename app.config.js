export default {
	expo: {
		extra: {
			eas: {
				projectId: "f0827f42-783e-481b-b19f-54993674d70c",
			},
			uri: "https://ohtup-staging.cs.helsinki.fi/bpt-stage",
		},
		icon: "./assets/icon.png",
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
		android: {
			adaptiveIcon: {
				backgroundColor: "#FFFFFF",
				foregroundImage: "./assets/adaptive-icon.png",
			},
			config: {
				googleMaps: {
					apiKey: 1234,
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
	},
};
