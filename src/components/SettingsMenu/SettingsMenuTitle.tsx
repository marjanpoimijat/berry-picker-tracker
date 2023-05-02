import { Text, View } from "react-native";
import settingsMenuStyles from "../../styles/settingsMenuStyles";
import { languages } from "../../languages";
import { useTypedSelector } from "../../store";

/**
 * A title component for the settings menu.
 * Note that it differs from the regular Title component.
 *
 * @returns {JSX.Element} A new SettingsMenuTitle components.
 */
const SettingsMenuTitle = (): JSX.Element => {
	const language = useTypedSelector((state) => state.language);

	return (
		<View style={settingsMenuStyles.settingsMenuTitleBlock}>
			<Text style={settingsMenuStyles.settingsMenuTitle}>{languages["Settings"][language]}</Text>
		</View>
	);
};

export default SettingsMenuTitle;
