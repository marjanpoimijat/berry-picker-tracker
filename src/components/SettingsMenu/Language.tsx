import { View, Text } from "react-native";
import { languages } from "../../languages";
import { useTypedSelector } from "../../store";
import settingsMenuStyles from "../../styles/settingsMenuStyles";
import LanguageSelect from "./LanguageSelector";
import EmptyMenuBlock from "./EmptyMenuBlock";

/**
 * A settings menu block for changing the language.
 *
 * @returns {JSX.Element} A new Language component.
 */
export const Language = (): JSX.Element => {
	const language = useTypedSelector((state) => state.language);

	return (
		<>
			<View style={settingsMenuStyles.greySettingsMenuBlock}>
				<Text style={settingsMenuStyles.blockText}>{languages["Language"][language].toUpperCase()}</Text>
			</View>
			<View style={settingsMenuStyles.whiteSettingsMenuBlockBottomBorder}>
				<Text style={settingsMenuStyles.blockText}>{languages["Change language"][language]}</Text>
				<LanguageSelect />
			</View>
			<EmptyMenuBlock />
		</>
	);
};

export default Language;
