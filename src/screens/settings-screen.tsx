import { useEffect, useState } from "react";
import {
	Alert,
	Button,
	Text,
	TextInput,
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
import { Language, Map } from "../../types";
import { setUsername } from "../reducers/user-reducer";

export const SettingScreen = () => {
	// Some of the components are old and give unnecessary warnings,
	// so warnings are disabled. Enable by commenting:
	// eslint-disable-next-line @typescript-eslint/no-empty-function
	console.warn = () => {};

	const [
		username,
		userId,
		currTrack,
		currSend,
		mapLifetime,
		language,
		currMap,
	] = useTypedSelector((state) => [
		state.user.username,
		state.user.userId,
		state.user.trackingInterval / 1000,
		state.user.sendingInterval / 1000,
		state.user.mapLifetime,
		state.language,
		state.map,
	]);
	const routeActive = useTypedSelector((state) => state.route.active);
	const [localUsername, setLocalUsername] = useState<string>(username);
	const dispatch = useTypedDispatch();

	useEffect(() => {
		dispatch(setUsername(localUsername));
	}, [localUsername]);

	const alertCacheReset = () => {
		Alert.alert(
			languages["Clearing the map tile cache"][language],
			languages["Do you really want to clear the map tile cache?"][language],
			[
				{
					text: languages["Cancel"][language],
				},
				{
					onPress: async () => {
						await deleteTileCacheDirectory();
						await makeTileCacheDirectory();
					},
					text: languages["Clear"][language],
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
					onPress: async () => {
						await dispatch(resetUser());
						await dispatch(identifyUser());
					},
					text: languages["Reset"][language],
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
					onPress: async () => {
						await dispatch(changeDefaultSettings());
					},
					text: languages["Reset settings"][language],
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
			component: <Text>1 {languages["second"][language]}</Text>,
			key: index++,
			label: 1000,
		},
		{
			component: <Text>5 {languages["seconds"][language]}</Text>,
			key: index++,
			label: 5000,
		},
		{
			component: <Text>10 {languages["seconds"][language]}</Text>,
			key: index++,
			label: 10000,
		},
		{
			component: <Text>30 {languages["seconds"][language]}</Text>,
			key: index++,
			label: 30000,
		},
		{
			component: <Text>1 {languages["minute"][language]}</Text>,
			key: index++,
			label: 60000,
		},
	];

	index = 0;
	const sendFreq = [
		{
			component: <Text>10 {languages["seconds"][language]}</Text>,
			key: index++,
			label: 10000,
		},
		{
			component: <Text>30 {languages["seconds"][language]}</Text>,
			key: index++,
			label: 30000,
		},
		{
			component: <Text>1 {languages["minute"][language]}</Text>,
			key: index++,
			label: 60000,
		},
		{
			component: <Text>5 {languages["minutes"][language]}</Text>,
			key: index++,
			label: 300000,
		},
		{
			component: <Text>10 {languages["minutes"][language]}</Text>,
			key: index++,
			label: 600000,
		},
	];

	index = 0;
	const tileLifetime = [
		{
			component: <Text>12 {languages["hours"][language]}</Text>,
			key: index++,
			label: 12,
		},
		{
			component: <Text>24 {languages["hours"][language]}</Text>,
			key: index++,
			label: 24,
		},
		{
			component: <Text>48 {languages["hours"][language]}</Text>,
			key: index++,
			label: 48,
		},
		{
			component: <Text>72 {languages["hours"][language]}</Text>,
			key: index++,
			label: 72,
		},
	];

	index = 0;
	const languageOption = [
		{ component: <Text>English</Text>, key: index++, label: Language.English },
		{ component: <Text>suomi</Text>, key: index++, label: Language.Finnish },
		{ component: <Text>svenska</Text>, key: index++, label: Language.Swedish },
	];

	index = 0;
	const mapOptions = [
		{
			component: (
				<Text>{languages["National Land Survey of Finland"][language]}</Text>
			),
			key: index++,
			label: Map.nlsTopographic,
		},
		{
			component: <Text>OpenStreetMap</Text>,
			key: index++,
			label: Map.openStreetMap,
		},
		{
			component: <Text>{languages["Plain map"][language]}</Text>,
			key: index++,
			label: Map.nlsPlain,
		},
		{
			component: <Text>{languages["Aerial image"][language]}</Text>,
			key: index++,
			label: Map.nlsAerial,
		},
	];

	const settingsData: SettingsData = [
		{
			header: `${languages["Language"][language]}`.toUpperCase(),
			rows: [
				{
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
					title: languages["Change language"][language],
				},
			],
			type: "SECTION",
		},
		{
			footer: languages["Decrease frequencies to save battery life"][language],
			header: `${languages["Navigation"][language]}`.toUpperCase(),
			rows: [
				{
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
					title: languages["Waypoint tracking frequency"][language],
				},
				{
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
					title: languages["Waypoint sending frequency"][language],
				},
				{
					renderAccessory: () => <SettingsToggle />,
					title: languages["Offline mode"][language],
				},
			],
			type: "SECTION",
		},
		{
			footer:
				languages["Clear the cached map tiles to free up space"][language],
			header: `${languages["Map"][language]}`.toUpperCase(),
			rows: [
				{
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
					title: languages["Change map type"][language],
				},
				{
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
					title: languages["Map tile lifetime"][language],
				},
				{
					renderAccessory: () => (
						<Button
							color="red"
							onPress={() => alertCacheReset()}
							title={languages["Clear"][language]}
						/>
					),
					title: languages["Clear the map tile cache"][language],
					titleStyle: {
						color: "red",
					},
				},
			],
			type: "SECTION",
		},
		{
			footer: languages["Tap your UserID to copy it"][language],
			header: `${languages["User information"][language]}`.toUpperCase(),
			rows: [
				{
					renderAccessory: () => (
						<TextInput
							onChangeText={setLocalUsername}
							placeholder={languages["Type username"][language]}
							style={{ color: "dimgrey", fontSize: 12, textAlign: "right" }}
							value={localUsername}
						/>
					),
					title: languages["Username"][language],
				},
				{
					renderAccessory: () => (
						<TouchableOpacity onPress={() => copyToClipboard(userId)}>
							<Text style={{ color: "dimgrey", fontSize: 12 }}>{userId}</Text>
						</TouchableOpacity>
					),
					title: languages["UserID"][language],
				},
				{
					renderAccessory: () => (
						<Button
							color="red"
							onPress={() =>
								routeActive ? alertRouteIsActive() : alertUserIDReset()
							}
							title={languages["Reset"][language]}
						/>
					),
					title: languages["Reset UserID"][language],
					titleStyle: {
						color: "red",
					},
				},
			],
			type: "SECTION",
		},
		{
			header: `${languages["Default settings"][language]}`.toUpperCase(),
			rows: [
				{
					renderAccessory: () => (
						<Button
							color="red"
							onPress={() => alertSettingsReset()}
							title={languages["Reset settings"][language]}
						/>
					),
					title: languages["Reset settings to default"][language],
					titleStyle: {
						color: "red",
					},
				},
			],
			type: "SECTION",
		},
		{
			footer: languages["Links to privacy policy and licenses"][language],
			header: `${languages["Legal information"][language]}`.toUpperCase(),
			rows: [
				{
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
					title: languages["Frontend licenses"][language],
				},
				{
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
					title: languages["Backend licenses"][language],
				},
				{
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
					title: languages["Privacy policy"][language],
				},
			],
			type: "SECTION",
		},
		{
			footer:
				languages[
					"Download link to National Land Survey of Finland map legend information"
				][language],
			header: `${languages["Map legend"][language]}`.toUpperCase(),
			rows: [
				{
					renderAccessory: () => (
						<Icon
							name="chevron-right"
							onPress={() => Linking.openURL(`${baseUrl}/get-legend/`)}
						/>
					),
					title: languages["Download map legend"][language],
				},
			],
			type: "SECTION",
		},
		{
			render: () => (
				<Text style={{ ...Styles.defaultText, padding: 15 }}>
					{languages["Version"][language]}: {version}
				</Text>
			),
			type: "CUSTOM_VIEW",
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
