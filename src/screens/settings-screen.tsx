import SettingsToggle from "../components/settings-toggle";
import theme from "../theme";
import { useState } from "react";
import {
	StyleSheet,
	Text,
	View,
	StatusBar,
	Image,
	Platform,
	RefreshControl,
	Switch,
} from "react-native";

import { SettingsScreen, SettingsData } from "react-native-settings-screen";
import ModalSelector from "react-native-modal-selector";

export const SettingScreen = () => {
	const [refreshing, setRefreshing] = useState(false);

	let index = 0;
	const frequencies = [
		{ key: index++, label: 1 },
		{ key: index++, label: 2 },
		{ key: index++, label: 3 },
		{ key: index++, label: 4 },
	];

	const settingsData: SettingsData = [
		{
			type: "SECTION",
			header: "Navigation".toUpperCase(),
			footer: "Change tracking and sending frequencies to save on battery life",
			rows: [
				{
					title: "Waypoint storing frequency",
					renderAccessory: () => (
						<ModalSelector
							data={frequencies}
							initValue="Hey"
							onChange={() => {}}
						/>
					),
				},
				{
					title: "Switch",
					renderAccessory: () => <SettingsToggle />,
				},
				{
					title: "Text",
					renderAccessory: () => (
						<Text style={{ color: "#999", marginRight: 6, fontSize: 18 }}>
							Maybe
						</Text>
					),
				},
			],
		},
		{
			type: "SECTION",
			header: "My Other Section".toUpperCase(),
			rows: [
				{
					title: "Dolor Nullam",
					showDisclosureIndicator: true,
				},
				{
					title: "Nulla vitae elit libero",
					renderAccessory: () => (
						<Text style={{ color: "#999", marginRight: 6, fontSize: 18 }}>
							Dapibus
						</Text>
					),
				},
				{
					title: "Ipsum Lorem Venenatis",
					subtitle: "Vestibulum Inceptos Fusce Justo",
					renderAccessory: () => (
						<Text style={{ color: "#999", marginRight: 6, fontSize: 18 }}>
							Yes
						</Text>
					),
					showDisclosureIndicator: true,
				},
				{
					title: "Cras Euismod",
					showDisclosureIndicator: true,
				},
			],
		},
		{
			type: "SECTION",
			header: "User information".toUpperCase(),
			rows: [
				{
					title: "Reset user-ID",
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
		width: "90%",
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
