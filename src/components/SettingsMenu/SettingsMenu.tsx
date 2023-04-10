import { ScrollView, View, Text } from "react-native";
import { languages } from "../../languages";
import { useTypedSelector } from "../../store";
import SettingsMenuStyles from "../../styles/SettingsMenuStyles";
import Map from "./Map";
import UserInformation from "./UserInformation";
import LegalInformation from "./LegalInformation";
import Legend from "./Legend";
import Navigation from "./Navigation";
import Language from "./Language";
import ResetSettings from "./ResetSettings";

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
				<Map />
				<UserInformation />
				<LegalInformation />
				<ResetSettings />
				<Legend />
			</ScrollView>
		</View>
	);
};

export default SettingsMenu;
