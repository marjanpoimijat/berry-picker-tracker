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
import { version, baseUrl, repoBaseUrl } from "../constants";
import AppHeader from "../components/app-header";
import SettingsToggle from "../components/settings-toggle";
import { languages } from "../languages";
import { changeLanguage } from "../reducers/language-reducer";
import { changeMap } from "../reducers/map-reducer";
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
import { Language, Map } from "../types";

export const SettingScreen = () => {
	// Some of the components are old and give unnecessary warnings,
	// so warnings are disabled. Enable by commenting:
	// eslint-disable-next-line @typescript-eslint/no-empty-function
	console.warn = () => {};

	const [userId, currTrack, currSend, mapLifetime, language, currMap] =
		useTypedSelector((state) => [
			state.user.userId,
			state.user.trackingInterval / 1000,
			state.user.sendingInterval / 1000,
			state.user.mapLifetime,
			state.language,
			state.map,
		]);
	const routeActive = useTypedSelector((state) => state.route.active);

	const dispatch = useTypedDispatch();

	const alertCacheReset = () => {
		Alert.alert(
			languages["Clearing the map tile cache"][language],
			languages["Do you really want to clear the map tile cache?"][language],
			[
				{
					text: languages["Cancel"][language],
				},
				{
					text: languages["Clear"][language],
					onPress: async () => {
						await deleteTileCacheDirectory();
						await makeTileCacheDirectory();
					},
				},
			]
		);
	};

	const alertUserIDReset = () => {
		Alert.alert(
			languages["Resetting the userID"][language],
			languages["Do you really want to reset the userID?"][language],
			[
				{
					text: languages["Cancel"][language],
				},
				{
					text: languages["Reset"][language],
					onPress: async () => {
						await dispatch(resetUser());
						await dispatch(identifyUser());
					},
				},
			]
		);
	};

	const alertSettingsReset = () => {
		Alert.alert(
			languages["Resetting the settings"][language],
			languages["Do you really want to reset the settings?"][language],
			[
				{
					text: languages["Cancel"][language],
				},
				{
					text: languages["Reset settings"][language],
					onPress: async () => {
						await dispatch(changeDefaultSettings());
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

	index = 0;
	const mapOptions = [
		{
			key: index++,
			component: (
				<Text>{languages["National Land Survey of Finland"][language]}</Text>
			),
			label: Map.nlsTopographic,
		},
		{
			key: index++,
			component: <Text>OpenStreetMap</Text>,
			label: Map.openStreetMap,
		},
		{
			key: index++,
			component: <Text>{languages["Plain map"][language]}</Text>,
			label: Map.nlsPlain,
		},
		{
			key: index++,
			component: <Text>{languages["Aerial image"][language]}</Text>,
			label: Map.nlsAerial,
		},
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
							cancelText={languages["Cancel"][language].toLowerCase()}
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
							cancelText={languages["Cancel"][language].toLowerCase()}
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
							cancelText={languages["Cancel"][language].toLowerCase()}
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
			header: `${languages["Map"][language]}`.toUpperCase(),
			footer:
				languages["Clear the cached map tiles to free up space"][language],
			rows: [
				{
					title: languages["Change map type"][language],
					renderAccessory: () => (
						<ModalSelector
							cancelText={languages["Cancel"][language].toLowerCase()}
							data={mapOptions}
							initValue={currMap}
							initValueTextStyle={Styles.initValueTextStyle}
							onChange={async (option: { label: Map }) => {
								await dispatch(changeMap(option.label));
							}}
						/>
					),
				},
				{
					title: languages["Map tile lifetime"][language],
					renderAccessory: () => (
						<ModalSelector
							cancelText={languages["Cancel"][language].toLowerCase()}
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
					title: languages["Clear the map tile cache"][language],
					titleStyle: {
						color: "red",
					},
					renderAccessory: () => (
						<Button
							color="red"
							onPress={() => alertCacheReset()}
							title={languages["Clear"][language]}
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
							color="red"
							onPress={() =>
								routeActive ? alertRouteIsActive() : alertUserIDReset()
							}
							title={languages["Reset"][language]}
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
							color="red"
							onPress={() => alertSettingsReset()}
							title={languages["Reset settings"][language]}
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
									`${repoBaseUrl}/berry-picker-tracker/tree/main/licenses`
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
									`${repoBaseUrl}/berry-picker-tracker-server/tree/main/licenses`
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
									`${repoBaseUrl}/berry-picker-tracker-docs/blob/main/privacy_policies.md`
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
