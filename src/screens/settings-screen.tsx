import SettingsToggle from "../components/settings-toggle";
import theme from "../theme";
import { useState } from "react";
import {
	StyleSheet,
	Text,
	View,
	StatusBar,
	RefreshControl,
} from "react-native";
import { useTypedDispatch, useTypedSelector } from "../store";

import { SettingsScreen, SettingsData } from "react-native-settings-screen";
import ModalSelector from "react-native-modal-selector";
import { setInterval } from "../reducers/user-reducer";

export const SettingScreen = () => {
	const [refreshing, setRefreshing] = useState(false);

	const dispatch = useTypedDispatch();
	const userId = useTypedSelector((state) => state.user.userId);
	const currTrack = useTypedSelector((state) => state.user.trackingInterval);
	const currSend = useTypedSelector((state) => state.user.sendingInterval);

	let index = 0;
	const trackFreq = [
		{ key: index++, component: <Text>1 second</Text>, label: 1 },
		{ key: index++, component: <Text>5 seconds</Text>, label: 5 },
		{ key: index++, component: <Text>10 seconds</Text>, label: 10 },
		{ key: index++, component: <Text>30 seconds</Text>, label: 30 },
		{ key: index++, component: <Text>1 minute</Text>, label: 60 },
	];

	index = 0;
	const sendFreq = [
		{ key: index++, component: <Text>10 seconds</Text>, label: 10 },
		{ key: index++, component: <Text>30 seconds</Text>, label: 30 },
		{ key: index++, component: <Text>1 minute</Text>, label: 60 },
		{ key: index++, component: <Text>5 minutes</Text>, label: 300 },
		{ key: index++, component: <Text>10 minutes</Text>, label: 600 },
	];

	index = 0;
	const tileLifetime = [
		{ key: index++, component: <Text>12 hours</Text>, label: 43200 },
		{ key: index++, component: <Text>24 hours</Text>, label: 86400 },
		{ key: index++, component: <Text>48 hours</Text>, label: 172800 },
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
							onModalClose={async (option) => {
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
							onModalClose={async (option) => {
								await dispatch(setInterval(option.label, true));
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
							onModalClose={(option) => {
								alert(option.component);
							}}
						/>
					),
				},
				{
					title: "Delete map cache",
					showDisclosureIndicator: true,
					titleStyle: {
						color: "red",
					},
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
					showDisclosureIndicator: true,
					titleStyle: {
						color: "red",
					},
				},
			],
		},
		{
			type: "CUSTOM_VIEW",
			render: () => <Text style={styles.textStyle}>v1.2.3</Text>,
		},
	];

	return (
		<View style={styles.container}>
			<StatusBar barStyle="light-content" backgroundColor="#8c231a" />
			<View style={styles.titleContainer}>
				<Text style={styles.headerStyle}>Settings</Text>
			</View>
			<SettingsScreen
				data={settingsData}
				globalTextStyle={styles.textStyle}
				scrollViewProps={{
					refreshControl: (
						<RefreshControl
							refreshing={refreshing}
							onRefresh={() => {
								setRefreshing(true);
								setTimeout(() => setRefreshing(false), 3000);
							}}
						/>
					),
				}}
			/>
		</View>
	);
};

/*
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  navBar: {
    backgroundColor: '#8c231c',
    height: 44 + statusBarHeight,
    alignSelf: 'stretch',
    paddingTop: statusBarHeight,
    justifyContent: 'center',
    alignItems: 'center',
  },
  navBarTitle: {
    color: 'white',
    fontFamily,
    fontSize: 17,
  },
  heroContainer: {
    marginTop: 40,
    marginBottom: 50,
    paddingVertical: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    borderTopWidth: StyleSheet.hairlineWidth,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: '#ccc',
    flexDirection: 'row',
  },
  heroImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 3,
    borderColor: 'black',
    marginHorizontal: 20,
  },
  heroTitle: {
    fontFamily,
    color: 'black',
    fontSize: 24,
  },
  heroSubtitle: {
    fontFamily,
    color: '#999',
    fontSize: 14,
  },
})
*/

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
	subheaderStyle: {
		fontSize: 14,
		fontWeight: "bold",
		color: "dimgrey",
		paddingTop: 10,
		paddingBottom: 2,
		paddingLeft: 10,
		alignSelf: "flex-start",
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
	rulerStyle: {
		borderBottomColor: "dimgrey",
		borderBottomWidth: StyleSheet.hairlineWidth,
		alignSelf: "stretch",
		marginVertical: 8,
	},
	separatorStyle: {
		borderBottomColor: "#eaeff6",
		borderBottomWidth: 8,
		alignSelf: "stretch",
		marginBottom: 8,
	},
	toggleStyle: {
		alignSelf: "flex-end",
	},
	screenHeadertext: {
		fontSize: theme.fontSizes.header,
		fontWeight: "bold",
		color: "black",
		marginBottom: 20,
		paddingBottom: 8,
		paddingLeft: 10,
		alignSelf: "flex-start",
	},
});

export default SettingScreen;
