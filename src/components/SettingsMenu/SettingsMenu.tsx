import { ScrollView, View, Text } from "react-native";
import { languages } from "../../languages";
import { useTypedSelector } from "../../store";
import SettingsMenuStyles from "../../styles/SettingsMenuStyles";
import LanguageSelect from "./LanguageSelect";
import MapSelect from "./MapSelect";
import UserInformation from "./UserInformation";
import LegalInformation from "./LegalInformation";
import Legend from "./Legend";
import Navigation from "./Navigation";

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
				<LanguageSelect />
				<Navigation />
				<MapSelect />
				<UserInformation />
				<LegalInformation />

				<Legend />
			</ScrollView>
		</View>
	);
};

export default SettingsMenu;
