import { ScrollView, View, Text } from "react-native";
import { languages } from "../../languages";
import { useTypedSelector } from "../../store";
import settingsMenuStyles from "../../styles/settingsMenuStyles";
import BatteryUse from "./BatteryUse";
import DefaultSettings from "./DefaultSettings";
import Language from "./Language";
import LegalInformation from "./LegalInformation";
import MapLegend from "./MapLegend";
import Navigation from "./Navigation";
import UserInformation from "./UserInformation";

/**
 * A menu which contains all the application settings.
 *
 * @returns {JSX.Element} A new SettingsMenu component.
 */
const SettingsMenu = (): JSX.Element => {
	const toggled = useTypedSelector((state) => state.ui.settingsMenuVisible);
	const language = useTypedSelector((state) => state.language);

	return (
		<View
			style={
				toggled
					? settingsMenuStyles.settingsMenuContainer
					: { ...settingsMenuStyles.settingsMenuContainer, display: "none" }
			}
		>
			<ScrollView style={settingsMenuStyles.settingsMenuContent}>
				<View style={settingsMenuStyles.settingsMenuTitleBlock}>
					<Text style={settingsMenuStyles.settingsMenuTitle}>{languages["Settings"][language]}</Text>
				</View>
				<Language />
				<Navigation />
				<BatteryUse />
				<UserInformation />
				<LegalInformation />
				<DefaultSettings />
				<MapLegend />
			</ScrollView>
		</View>
	);
};

export default SettingsMenu;
