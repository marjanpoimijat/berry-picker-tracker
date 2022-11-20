import { Alert, Button, StyleSheet, Text, View } from "react-native";
import { useTypedDispatch, useTypedSelector } from "../store";
import { identifyUser, resetUser, setInterval } from "../reducers/user-reducer";
import {
	deleteTileCacheDirectory,
	makeTileCacheDirectory,
} from "../utils/file-system";
import { SettingsScreen, SettingsData } from "react-native-settings-screen";
import SettingsToggle from "../components/settings-toggle";
import ModalSelector from "react-native-modal-selector";

export const SettingScreen = () => {
	const [userId, currTrack, currSend] = useTypedSelector((state) => [
		state.user.userId,
		state.user.trackingInterval / 1000,
		state.user.sendingInterval / 1000,
	]);

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
					},
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
		{ key: index++, component: <Text>12 hours</Text>, label: 43200000 },
		{ key: index++, component: <Text>24 hours</Text>, label: 86400000 },
		{ key: index++, component: <Text>48 hours</Text>, label: 172800000 },
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
							initValue={currTrack.toString()}
							onChange={async (option) => {
								await dispatch(setInterval(option.label, true));
							}}
						/>
					),
				},
				{
					title: "Waypoint sending frequency",
					renderAccessory: () => (
						<ModalSelector
							data={sendFreq}
							initValue={currSend.toString()}
							onChange={async (option) => {
								await dispatch(setInterval(option.label, false));
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
			footer: "Delete all cached map tiles to clear space",
			rows: [
				{
					title: "Maptile lifetime",
					renderAccessory: () => (
						<ModalSelector
							data={tileLifetime}
							initValue="Lifetime"
							onChange={(option) => {
								alert(option.component);
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
							onPress={() => alertOnReset("UserID")}
							color="red"
						/>
					),
				},
			],
		},
		{
			type: "CUSTOM_VIEW",
			render: () => <Text style={styles.textStyle}>v1.0.0</Text>,
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
		height: "90%",
		alignItems: "flex-start",
		justifyContent: "center",
		flexDirection: "column",
	},
	titleContainer: {
		flex: 0.15,
		width: "90%",
		height: "20%",
		alignItems: "flex-end",
		justifyContent: "center",
		flexDirection: "column",
	},
	headerStyle: {
		fontSize: 18,
		color: "dimgrey",
		paddingTop: 20,
		paddingBottom: 2,
		paddingHorizontal: 0,
		alignSelf: "flex-start",
	},
	textStyle: {
		fontSize: 13,
		color: "dimgrey",
		paddingTop: 5,
		paddingBottom: 0,
		paddingLeft: 20,
		alignSelf: "flex-start",
	},
});

export default SettingScreen;
