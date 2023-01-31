import {
	Alert,
	Button,
	Text,
	View,
	Linking,
	TouchableOpacity,
	Clipboard,
} from "react-native";
import { useTypedDispatch, useTypedSelector } from "../store";
import {
	changeDefaultSettings,
	changeMapLifetime,
	identifyUser,
	resetUser,
	changeTrackingInterval,
	changeSendingInterval,
} from "../reducers/user-reducer";
import {
	deleteTileCacheDirectory,
	makeTileCacheDirectory,
} from "../utils/file-system";
import { SettingsScreen, SettingsData } from "react-native-settings-screen";
import SettingsToggle from "../components/settings-toggle";
import ModalSelector from "react-native-modal-selector";
import { version, baseUrl } from "../constants";
import Icon from "react-native-vector-icons/FontAwesome5";
import Styles from "../styles";
import AppHeader from "../components/app-header";
import { changeLanguage } from "../reducers/language-reducer";

export const SettingScreen = () => {
	// Some of the components are old and give unnecessary warnings,
	// so warnings are disabled. Enable by commenting:
	// eslint-disable-next-line @typescript-eslint/no-empty-function
	console.warn = () => {};

	const [userId, currTrack, currSend, mapLifetime] = useTypedSelector(
		(state) => [
			state.user.userId,
			state.user.trackingInterval / 1000,
			state.user.sendingInterval / 1000,
			state.user.mapLifetime,
		]
	);
	const routeActive = useTypedSelector((state) => state.route.active);

	const dispatch = useTypedDispatch();

	const alertOnReset = (target: string) => {
		Alert.alert(
			`Resetting ${target}`,
			`Do you really want to reset ${target}?`,
			[
				{
					text: "Cancel",
				},
				{
					text: "Reset",
					onPress: async () => {
						if (target === "UserID") {
							await dispatch(resetUser());
							await dispatch(identifyUser());
						}
						if (target === "maptile cache") {
							deleteTileCacheDirectory();
							makeTileCacheDirectory();
						}
						if (target === "settings") {
							await dispatch(changeDefaultSettings());
						}
					},
				},
			]
		);
	};

	const alertRouteIsActive = () => {
		Alert.alert(
			"Route is currently active",
			"UserID can not be reseted while route is active. End route route first and try again",
			[
				{
					text: "OK",
				},
			]
		);
	};

	const copyToClipboard = (target: string | null) => {
		if (target !== null) {
			console.log(`Copied ${target} to clipboard`);
			Clipboard.setString(target);
		} else {
			console.log(`Empty userID`);
		}
	};

	let index = 0;
	const trackFreq = [
		{ key: index++, component: <Text>1 second</Text>, label: 1000 },
		{ key: index++, component: <Text>5 seconds</Text>, label: 5000 },
		{ key: index++, component: <Text>10 seconds</Text>, label: 10000 },
		{ key: index++, component: <Text>30 seconds</Text>, label: 30000 },
		{ key: index++, component: <Text>1 minute</Text>, label: 60000 },
	];

	index = 0;
	const sendFreq = [
		{ key: index++, component: <Text>10 seconds</Text>, label: 10000 },
		{ key: index++, component: <Text>30 seconds</Text>, label: 30000 },
		{ key: index++, component: <Text>1 minute</Text>, label: 60000 },
		{ key: index++, component: <Text>5 minutes</Text>, label: 300000 },
		{ key: index++, component: <Text>10 minutes</Text>, label: 600000 },
	];

	index = 0;
	const tileLifetime = [
		{ key: index++, component: <Text>12 hours</Text>, label: 12 },
		{ key: index++, component: <Text>24 hours</Text>, label: 24 },
		{ key: index++, component: <Text>48 hours</Text>, label: 48 },
		{ key: index++, component: <Text>72 hours</Text>, label: 72 },
	];

	index = 0;
	const languageOption = [
		{ key: index++, component: <Text>English</Text>, label: 0 },
		{ key: index++, component: <Text>Finnish</Text>, label: 1 },
	];

	const settingsData: SettingsData = [
		{
			type: "SECTION",
			header: "Language".toUpperCase(),
			rows: [
				{
					title: "Change language",
					renderAccessory: () => (
						<ModalSelector
							data={languageOption}
							initValue={"English"}
							initValueTextStyle={Styles.initValueTextStyle}
							onChange={async (option: { label: number }) => {
								await dispatch(changeLanguage(option.label));
							}}
						/>
					),
				},
			],
		},
		{
			type: "SECTION",
			header: "Navigation".toUpperCase(),
			footer: "Change frequencies to save battery life",
			rows: [
				{
					title: "Waypoint tracking frequency",
					renderAccessory: () => (
						<ModalSelector
							data={trackFreq}
							initValue={currTrack.toString() + " s"}
							initValueTextStyle={Styles.initValueTextStyle}
							onChange={async (option: { label: number }) => {
								await dispatch(changeTrackingInterval(option.label));
							}}
						/>
					),
				},
				{
					title: "Waypoint sending frequency",
					renderAccessory: () => (
						<ModalSelector
							data={sendFreq}
							initValue={currSend.toString() + " s"}
							initValueTextStyle={Styles.initValueTextStyle}
							onChange={async (option: { label: number }) => {
								await dispatch(changeSendingInterval(option.label));
							}}
						/>
					),
				},
				{
					title: "Offline mode",
					renderAccessory: () => <SettingsToggle />,
				},
			],
		},
		{
			type: "SECTION",
			header: "Map cache".toUpperCase(),
			footer: "Delete cached map tiles to clear space",
			rows: [
				{
					title: "Maptile lifetime",
					renderAccessory: () => (
						<ModalSelector
							data={tileLifetime}
							initValue={mapLifetime.toString() + " h"}
							initValueTextStyle={Styles.initValueTextStyle}
							onChange={async (option: { label: number }) => {
								await dispatch(changeMapLifetime(option.label));
							}}
						/>
					),
				},
				{
					title: "Delete maptile cache",
					titleStyle: {
						color: "red",
					},
					renderAccessory: () => (
						<Button
							title="RESET"
							onPress={() => alertOnReset("maptile cache")}
							color="red"
						/>
					),
				},
			],
		},
		{
			type: "SECTION",
			header: "User information".toUpperCase(),
			footer: "Click your UserID to copy it",
			rows: [
				{
					title: "UserID",
					renderAccessory: () => (
						<TouchableOpacity onPress={() => copyToClipboard(userId)}>
							<Text style={{ color: "dimgrey", fontSize: 12 }}>{userId}</Text>
						</TouchableOpacity>
					),
				},
				{
					title: "Reset UserID",
					titleStyle: {
						color: "red",
					},
					renderAccessory: () => (
						<Button
							title="RESET"
							onPress={() =>
								routeActive ? alertRouteIsActive() : alertOnReset("UserID")
							}
							color="red"
						/>
					),
				},
			],
		},
		{
			type: "SECTION",
			header: "Default settings".toUpperCase(),
			rows: [
				{
					title: "Reset settings to default",
					titleStyle: {
						color: "red",
					},
					renderAccessory: () => (
						<Button
							title="RESET"
							onPress={() => alertOnReset("settings")}
							color="red"
						/>
					),
				},
			],
		},
		{
			type: "SECTION",
			header: "Legal information".toUpperCase(),
			footer: "Links to privacy policy and licenses",
			rows: [
				{
					title: "Front end licenses",
					renderAccessory: () => (
						<Icon
							name="chevron-right"
							onPress={() =>
								Linking.openURL(
									"https://github.com/hy-ohtu-syksy-22-bpt/berry-picker-tracker/tree/main/licenses"
								)
							}
						/>
					),
				},
				{
					title: "Back end licenses",
					renderAccessory: () => (
						<Icon
							name="chevron-right"
							onPress={() =>
								Linking.openURL(
									"https://github.com/hy-ohtu-syksy-22-bpt/berry-picker-tracker-server/tree/main/licenses"
								)
							}
						/>
					),
				},
				{
					title: "Privacy policy",
					renderAccessory: () => (
						<Icon
							name="chevron-right"
							onPress={() =>
								Linking.openURL(
									"https://github.com/hy-ohtu-syksy-22-bpt/berry-picker-tracker-docs/blob/main/privacy_policies.md"
								)
							}
						/>
					),
				},
			],
		},
		{
			type: "SECTION",
			header: "Map legend".toUpperCase(),
			footer:
				"Download link to National Land Survey of Finland map legend information",
			rows: [
				{
					title: "Download map legends",
					renderAccessory: () => (
						<Icon
							name="chevron-right"
							onPress={() => Linking.openURL(`${baseUrl}/get-legend/`)}
						/>
					),
				},
			],
		},
		{
			type: "CUSTOM_VIEW",
			render: () => (
				<Text style={{ ...Styles.defaultText, padding: 15 }}>
					Version: {version}
				</Text>
			),
		},
	];

	return (
		<View style={Styles.screenContainer}>
			<AppHeader text={"Settings"} />
			<SettingsScreen
				data={settingsData}
				globalTextStyle={Styles.defaultText}
			/>
		</View>
	);
};

export default SettingScreen;
