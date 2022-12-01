import {
	Alert,
	Button,
	Dimensions,
	StyleSheet,
	Text,
	View,
	Linking,
	TouchableHighlight,
	TouchableOpacity,
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
import { statusBarHeight, version } from "../constants";
import Icon from "react-native-vector-icons/FontAwesome5";

export const SettingScreen = () => {
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

	const settingsData: SettingsData = [
		{
			type: "SECTION",
			header: "Navigation".toUpperCase(),
			footer:
				"Change tracking and sending frequencies to save battery life and turn the app to offline mode",
			rows: [
				{
					title: "Waypoint tracking frequency",
					renderAccessory: () => (
						<ModalSelector
							data={trackFreq}
							initValue={currTrack.toString() + " s"}
							initValueTextStyle={styles.initValueStyle}
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
							initValueTextStyle={styles.initValueStyle}
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
			footer:
				"Delete cached map tiles to clear space and change their lifetime",
			rows: [
				{
					title: "Maptile lifetime",
					renderAccessory: () => (
						<ModalSelector
							data={tileLifetime}
							initValue={mapLifetime.toString() + " h"}
							initValueTextStyle={styles.initValueStyle}
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
			footer: "Check, copy and reset your UserID or restore default settings",
			rows: [
				{
					title: "UserID",
					renderAccessory: () => (
						<Text style={{ color: "dimgrey", fontSize: 12 }}>
							{`${userId ? userId : "not stored yet"}`}
						</Text>
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
				{
					title: "Reset settings to default",
					renderAccessory: () => (
						<Button
							title="RESET"
							onPress={() => alertOnReset("settings")}
							color="dimgrey"
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
			type: "CUSTOM_VIEW",
			render: () => (
				<Text style={{ ...styles.textStyle, padding: 15 }}>
					Version: {version}
				</Text>
			),
		},
	];

	return (
		<View style={styles.container}>
			<View style={styles.titleContainer}>
				<Text style={styles.headerStyle}>Settings</Text>
			</View>
			<SettingsScreen data={settingsData} globalTextStyle={styles.textStyle} />
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 0,
		width: "95%",
		height: Dimensions.get("window").height - 75,
		alignItems: "flex-start",
		justifyContent: "center",
		flexDirection: "column",
		top: statusBarHeight,
		paddingLeft: 10,
		paddingRight: 10,
	},
	titleContainer: {
		flex: 0,
		width: "100%",
		height: "6%",
		justifyContent: "center",
		flexDirection: "row",
		borderBottomColor: "lightgrey",
		borderBottomWidth: 1.5,
	},
	headerStyle: {
		fontSize: 20,
		color: "dimgrey",
		alignContent: "center",
		alignSelf: "center",
	},
	textStyle: {
		fontSize: 13,
		color: "dimgrey",
		paddingTop: 5,
		alignSelf: "flex-start",
	},
	initValueStyle: {
		width: 43,
		alignContent: "center",
	},
	buttonStyle: {
		width: 43,
		alignContent: "center",
		borderRadius: 10,
		height: 30,
		backgroundColor: "white",
	},
});

export default SettingScreen;
