import { ScrollView, View, Text } from "react-native";
import { languages } from "../../languages";
import { useTypedSelector } from "../../store";
import SettingsMenuStyles from "../../styles/SettingsMenuStyles";
import LanguageSelect from "./LanguageSelect";
import MapSelect from "./MapSelect";
import UserInformation from "./UserInformation";
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
				<LanguageSelect />
				<MapSelect />
				<View style={SettingsMenuStyles.SettingContainer}>
					<Text style={SettingsMenuStyles.SettingsMenuTitle}>{languages["User information"][language]}</Text>
					<UserInformation />
				</View>
			</ScrollView>
		</View>
	);
};

export default SettingsMenu;
