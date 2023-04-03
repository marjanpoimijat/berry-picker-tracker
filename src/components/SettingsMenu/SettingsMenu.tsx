import { ScrollView, View, Text } from "react-native";
import { languages } from "../../languages";
import { useTypedSelector } from "../../store";
import SettingsMenuStyles from "../../styles/SettingsMenuStyles";
import LanguageSelect from "./LanguageSelect";
import MapSelect from "./MapSelect";
import UserInformation from "./UserInformation";
import LegalInformation from "./LegalInformation";
import Legend from "./Legend";
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
				<View style={{ alignItems: "center" }}>
					<Text style={SettingsMenuStyles.SettingsMenuTitle}>{languages["Settings"][language]}</Text>
				</View>
<<<<<<< HEAD
=======
				<View style={SettingsMenuStyles.SettingContainer}>
					<Text>{languages["Language"][language]}</Text>
					<LanguageSelect />
				</View>
				<MapSelect />
				<View style={SettingsMenuStyles.SettingContainer}>
					<Text style={SettingsMenuStyles.SettingsMenuTitle}>{languages["User information"][language]}</Text>
					<UserInformation />
				</View>
>>>>>>> 8bc7d01 (Legend for new settings)

				<LanguageSelect />

				<MapSelect />

				<UserInformation />

				<LegalInformation />
<<<<<<< HEAD
<<<<<<< HEAD

				<Legend />
=======
>>>>>>> 0324c15 (settings menu changes!)
=======

				<Legend />
>>>>>>> 8bc7d01 (Legend for new settings)
			</ScrollView>
		</View>
	);
};

export default SettingsMenu;
