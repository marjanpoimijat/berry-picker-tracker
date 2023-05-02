import { ScrollView, View } from "react-native";
import { useTypedSelector } from "../../store";
import settingsMenuStyles from "../../styles/settingsMenuStyles";
import BatteryUse from "./BatteryUse";
import DefaultSettings from "./DefaultSettings";
import Language from "./Language";
import LegalInformation from "./LegalInformation";
import MapLegend from "./MapLegend";
import Navigation from "./Navigation";
import SettingsMenuTitle from "./SettingsMenuTitle";
import UserInformation from "./UserInformation";

/**
 * A menu which contains all the application settings.
 *
 * @returns {JSX.Element} A new SettingsMenu component.
 */
const SettingsMenu = (): JSX.Element => {
	const toggled = useTypedSelector((state) => state.ui.settingsMenuVisible);

	return (
		<View
			style={
				toggled
					? settingsMenuStyles.settingsMenuContainer
					: { ...settingsMenuStyles.settingsMenuContainer, display: "none" }
			}
		>
			<ScrollView style={settingsMenuStyles.settingsMenuContent}>
				<SettingsMenuTitle />
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
