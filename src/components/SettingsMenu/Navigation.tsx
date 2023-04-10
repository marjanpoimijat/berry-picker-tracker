import { View, Text } from "react-native";
import { languages } from "../../languages";
import { useTypedSelector } from "../../store";
import SettingsMenuStyles from "../../styles/SettingsMenuStyles";
import { SendingFrequency, TrackingFrequency } from "./FrequencySelect";
import SettingsToggle from "./SettingsToggle";

export const Navigation = (): JSX.Element => {
	const language = useTypedSelector((state) => state.language);
	const batterySaveText = "Decrease frequencies to save battery life";

	return (
		<>
			<View style={SettingsMenuStyles.GreySettingsMenuBlockBottomBorder}>
				<Text style={SettingsMenuStyles.BlockText}>{languages["Navigation"][language].toUpperCase()}</Text>
			</View>
			<View style={SettingsMenuStyles.WhiteSettingsMenuBlock}>
				<Text style={SettingsMenuStyles.BlockText}>{languages["Waypoint tracking frequency"][language]}</Text>
				<TrackingFrequency />
			</View>
			<View style={SettingsMenuStyles.WhiteSettingsMenuBlockBottomBorder}>
				<Text style={SettingsMenuStyles.BlockText}>{languages["Waypoint sending frequency"][language]}</Text>
				<SendingFrequency />
			</View>
			<View style={SettingsMenuStyles.WhiteSettingsMenuBlockBottomBorder}>
				<Text style={SettingsMenuStyles.BlockText}>{languages["Offline mode"][language]}</Text>
				<SettingsToggle />
			</View>
			<View style={SettingsMenuStyles.GreySettingsMenuBlock}>
				<Text style={SettingsMenuStyles.BlockText}>{languages[`${batterySaveText}`][language]}</Text>
			</View>
		</>
	);
};

export default Navigation;