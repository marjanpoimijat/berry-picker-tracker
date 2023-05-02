import { View, Text } from "react-native";
import { languages } from "../../languages";
import { useTypedSelector } from "../../store";
import settingsMenuStyles from "../../styles/settingsMenuStyles";
import EmptyMenuBlock from "./EmptyMenuBlock";
import { RefreshingFrequency, SendingFrequency, TrackingFrequency } from "./FrequencySelect";
import SettingsToggle from "./SettingsToggle";

/**
 * A settings menu block for changing the navigation settings.
 *
 * @returns {JSX.Element} A new Navigation component.
 */
export const Navigation = (): JSX.Element => {
	const language = useTypedSelector((state) => state.language);
	const batterySaveText = "Decrease frequencies to save battery life";

	return (
		<>
			<View style={settingsMenuStyles.greySettingsMenuBlockBottomBorder}>
				<Text style={settingsMenuStyles.blockText}>{languages["Navigation"][language].toUpperCase()}</Text>
			</View>
			<View style={settingsMenuStyles.whiteSettingsMenuBlock}>
				<Text style={settingsMenuStyles.blockText}>{languages["Waypoint tracking frequency"][language]}</Text>
				<TrackingFrequency />
			</View>
			<View style={settingsMenuStyles.whiteSettingsMenuBlock}>
				<Text style={settingsMenuStyles.blockText}>{languages["Waypoint sending frequency"][language]}</Text>
				<SendingFrequency />
			</View>
			<View style={settingsMenuStyles.whiteSettingsMenuBlockBottomBorder}>
				<Text style={settingsMenuStyles.blockText}>{languages["Routes refreshing frequency"][language]}</Text>
				<RefreshingFrequency />
			</View>
			<View style={settingsMenuStyles.whiteSettingsMenuBlockBottomBorder}>
				<Text style={settingsMenuStyles.blockText}>{languages["Offline mode"][language]}</Text>
				<SettingsToggle />
			</View>
			<View style={settingsMenuStyles.greySettingsMenuBlock}>
				<Text style={settingsMenuStyles.blockText}>{languages[`${batterySaveText}`][language]}</Text>
			</View>
			<EmptyMenuBlock />
		</>
	);
};

export default Navigation;
