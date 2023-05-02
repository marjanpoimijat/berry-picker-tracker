import { View, Text } from "react-native";
import { languages } from "../../languages";
import { useTypedSelector } from "../../store";
import SettingsMenuStyles from "../../styles/SettingsMenuStyles";
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
			<View style={SettingsMenuStyles.GreySettingsMenuBlock}>
				<Text style={SettingsMenuStyles.BlockText}>{languages["Language"][language].toUpperCase()}</Text>
			</View>
			<View style={SettingsMenuStyles.WhiteSettingsMenuBlockBottomBorder}>
				<Text style={SettingsMenuStyles.BlockText}>{languages["Change language"][language]}</Text>
				<LanguageSelect />
			</View>
			<EmptyMenuBlock />
		</>
	);
};

export default Language;
