import {
	Alert,
	Button,
	Text,
	View,
	Linking,
	TouchableOpacity,
	Clipboard,
} from "react-native";
import ModalSelector from "react-native-modal-selector";
import { SettingsScreen, SettingsData } from "react-native-settings-screen";
import Icon from "react-native-vector-icons/FontAwesome5";
import { version, baseUrl } from "../constants";
import AppHeader from "../components/app-header";
import SettingsToggle from "../components/settings-toggle";
import { languages } from "../languages";
import { changeLanguage } from "../reducers/language-reducer";
import {
	changeDefaultSettings,
	changeMapLifetime,
	identifyUser,
	resetUser,
	changeTrackingInterval,
	changeSendingInterval,
} from "../reducers/user-reducer";
import { useTypedDispatch, useTypedSelector } from "../store";
import Styles from "../styles";
import {
	deleteTileCacheDirectory,
	makeTileCacheDirectory,
} from "../utils/file-system";
import { Language } from "../types";

export const SettingScreen = () => {
	// Some of the components are old and give unnecessary warnings,
	// so warnings are disabled. Enable by commenting:
	// eslint-disable-next-line @typescript-eslint/no-empty-function
	console.warn = () => {};

	const [userId, currTrack, currSend, mapLifetime, language] = useTypedSelector(
		(state) => [
			state.user.userId,
			state.user.trackingInterval / 1000,
			state.user.sendingInterval / 1000,
			state.user.mapLifetime,
			state.language,
		]
	);
	const routeActive = useTypedSelector((state) => state.route.active);

	const dispatch = useTypedDispatch();

	const alertOnReset = (target: string) => {
		Alert.alert(
			`${languages["Resetting"][language]} ${languages[target][language]}`,
			`${languages["Do you really want to reset"][language]} ${languages[target][language]}?`,
			[
				{
					text: languages["Cancel"][language],
				},
				{
					text: languages["Reset"][language],
					onPress: async () => {
						if (target === "UserID") {
							await dispatch(resetUser());
							await dispatch(identifyUser());
						}
						if (target === "map tile cache") {
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
			languages["Route is currently active"][language],
			languages[
				"UserID can not be reset while route is active. End route route first and try again"
			][language],
			[
				{
					text: languages["OK"][language],
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
		{
			key: index++,
			component: <Text>1 {languages["second"][language]}</Text>,
			label: 1000,
		},
		{
			key: index++,
			component: <Text>5 {languages["seconds"][language]}</Text>,
			label: 5000,
		},
		{
			key: index++,
			component: <Text>10 {languages["seconds"][language]}</Text>,
			label: 10000,
		},
		{
			key: index++,
			component: <Text>30 {languages["seconds"][language]}</Text>,
			label: 30000,
		},
		{
			key: index++,
			component: <Text>1 {languages["minute"][language]}</Text>,
			label: 60000,
		},
	];

	index = 0;
	const sendFreq = [
		{
			key: index++,
			component: <Text>10 {languages["seconds"][language]}</Text>,
			label: 10000,
		},
		{
			key: index++,
			component: <Text>30 {languages["seconds"][language]}</Text>,
			label: 30000,
		},
		{
			key: index++,
			component: <Text>1 {languages["minute"][language]}</Text>,
			label: 60000,
		},
		{
			key: index++,
			component: <Text>5 {languages["minutes"][language]}</Text>,
			label: 300000,
		},
		{
			key: index++,
			component: <Text>10 {languages["minutes"][language]}</Text>,
			label: 600000,
		},
	];

	index = 0;
	const tileLifetime = [
		{
			key: index++,
			component: <Text>12 {languages["hours"][language]}</Text>,
			label: 12,
		},
		{
			key: index++,
			component: <Text>24 {languages["hours"][language]}</Text>,
			label: 24,
		},
		{
			key: index++,
			component: <Text>48 {languages["hours"][language]}</Text>,
			label: 48,
		},
		{
			key: index++,
			component: <Text>72 {languages["hours"][language]}</Text>,
			label: 72,
		},
	];

	index = 0;
	const languageOption = [
		{ key: index++, component: <Text>English</Text>, label: Language.English },
		{ key: index++, component: <Text>suomi</Text>, label: Language.Finnish },
		{ key: index++, component: <Text>svenska</Text>, label: Language.Swedish },
	];

	const settingsData: SettingsData = [
		{
			type: "SECTION",
			header: `${languages["Language"][language]}`.toUpperCase(),
			rows: [
				{
					title: languages["Change language"][language],
					renderAccessory: () => (
						<ModalSelector
							data={languageOption}
							initValue={language}
							initValueTextStyle={Styles.initValueTextStyle}
							onChange={async (option: { label: Language }) => {
								await dispatch(changeLanguage(option.label));
							}}
						/>
					),
				},
			],
		},
		{
			type: "SECTION",
			header: `${languages["Navigation"][language]}`.toUpperCase(),
			footer: languages["Decrease frequencies to save battery life"][language],
			rows: [
				{
					title: languages["Waypoint tracking frequency"][language],
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
					title: languages["Waypoint sending frequency"][language],
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
					title: languages["Offline mode"][language],
					renderAccessory: () => <SettingsToggle />,
				},
			],
		},
		{
			type: "SECTION",
			header: `${languages["Map cache"][language]}`.toUpperCase(),
			footer: languages["Delete cached map tiles to clear space"][language],
			rows: [
				{
					title: languages["Map tile lifetime"][language],
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
					title: languages["Delete map tile cache"][language],
					titleStyle: {
						color: "red",
					},
					renderAccessory: () => (
						<Button
							title={languages["Delete"][language]}
							onPress={() => alertOnReset("map tile cache")}
							color="red"
						/>
					),
				},
			],
		},
		{
			type: "SECTION",
			header: `${languages["User information"][language]}`.toUpperCase(),
			footer: languages["Tap your UserID to copy it"][language],
			rows: [
				{
					title: languages["UserID"][language],
					renderAccessory: () => (
						<TouchableOpacity onPress={() => copyToClipboard(userId)}>
							<Text style={{ color: "dimgrey", fontSize: 12 }}>{userId}</Text>
						</TouchableOpacity>
					),
				},
				{
					title: languages["Reset UserID"][language],
					titleStyle: {
						color: "red",
					},
					renderAccessory: () => (
						<Button
							title={languages["Reset"][language]}
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
			header: `${languages["Default settings"][language]}`.toUpperCase(),
			rows: [
				{
					title: languages["Reset settings to default"][language],
					titleStyle: {
						color: "red",
					},
					renderAccessory: () => (
						<Button
							title={languages["Reset"][language]}
							onPress={() => alertOnReset("settings")}
							color="red"
						/>
					),
				},
			],
		},
		{
			type: "SECTION",
			header: `${languages["Legal information"][language]}`.toUpperCase(),
			footer: languages["Links to privacy policy and licenses"][language],
			rows: [
				{
					title: languages["Frontend licenses"][language],
					renderAccessory: () => (
						<Icon
							name="chevron-right"
							onPress={() =>
								Linking.openURL(
									"https://github.com/marjanpoimijat/berry-picker-tracker/tree/main/licenses"
								)
							}
						/>
					),
				},
				{
					title: languages["Backend licenses"][language],
					renderAccessory: () => (
						<Icon
							name="chevron-right"
							onPress={() =>
								Linking.openURL(
									"https://github.com/marjanpoimijat/berry-picker-tracker-server/tree/main/licenses"
								)
							}
						/>
					),
				},
				{
					title: languages["Privacy policy"][language],
					renderAccessory: () => (
						<Icon
							name="chevron-right"
							onPress={() =>
								Linking.openURL(
									"https://github.com/marjanpoimijat/berry-picker-tracker-docs/blob/main/privacy_policies.md"
								)
							}
						/>
					),
				},
			],
		},
		{
			type: "SECTION",
			header: `${languages["Map legend"][language]}`.toUpperCase(),
			footer:
				languages[
					"Download link to National Land Survey of Finland map legend information"
				][language],
			rows: [
				{
					title: languages["Download map legend"][language],
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
					{languages["Version"][language]}: {version}
				</Text>
			),
		},
	];

	return (
		<View style={Styles.screenContainer}>
			<AppHeader text={languages["Settings"][language]} />
			<SettingsScreen
				data={settingsData}
				globalTextStyle={Styles.defaultText}
			/>
		</View>
	);
};

export default SettingScreen;
