import { ScrollView, View, Text } from "react-native";
import { languages } from "../../languages";
import { useTypedSelector } from "../../store";
import SettingsMenuStyles from "../../styles/SettingsMenuStyles";
import LanguageSelect from "./LanguageSelect";
import MapSelect from "./MapSelect";
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
				<View style={SettingsMenuStyles.SettingContainer}>
					<Text>{languages["Language"][language]}</Text>
					<LanguageSelect />
				</View>
				<View style={SettingsMenuStyles.SettingContainer}>
					<MapSelect />
				</View>
			</ScrollView>
		</View>
	);
};

export default SettingsMenu;
