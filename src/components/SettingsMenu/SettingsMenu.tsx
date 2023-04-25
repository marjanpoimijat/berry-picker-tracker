import { ScrollView, View, Text } from "react-native";
import { languages } from "../../languages";
import { useTypedSelector } from "../../store";
import SettingsMenuStyles from "../../styles/SettingsMenuStyles";
import DefaultSettings from "./DefaultSettings";
import Language from "./Language";
import LegalInformation from "./LegalInformation";
import Legend from "./Legend";
import Navigation from "./Navigation";
import UserInformation from "./UserInformation";

/**
 * Renders the settings menu which contains all the application settings
 *
 * @returns {JSX.Element}  A new SettingsMenu component
 */
const SettingsMenu = (): JSX.Element => {
	const toggled = useTypedSelector((state) => state.ui.settingsMenuVisible);
	const language = useTypedSelector((state) => state.language);

	return (
		<View
			style={
				toggled
					? SettingsMenuStyles.SettingsMenuContainer
					: { ...SettingsMenuStyles.SettingsMenuContainer, display: "none" }
			}
		>
			<ScrollView style={SettingsMenuStyles.SettingsMenuContent}>
				<View style={SettingsMenuStyles.SettingsMenuTitleBlock}>
					<Text style={SettingsMenuStyles.SettingsMenuTitle}>{languages["Settings"][language]}</Text>
				</View>
				<Language />
				<Navigation />
				<UserInformation />
				<LegalInformation />
				<DefaultSettings />
				<Legend />
			</ScrollView>
		</View>
	);
};

export default SettingsMenu;
