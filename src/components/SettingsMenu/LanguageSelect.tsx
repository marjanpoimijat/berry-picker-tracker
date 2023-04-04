import { Text, View } from "react-native";
import ModalSelector from "react-native-modal-selector";
import { languages } from "../../languages";
import { changeLanguage } from "../../reducers/language-reducer";
import { Language } from "../../types";
import { useTypedDispatch, useTypedSelector } from "../../store";
import Styles from "../../styles";
import SettingsMenuStyles from "../../styles/SettingsMenuStyles";

const LanguageSelect = (): JSX.Element => {
	const [language, dispatch] = [useTypedSelector((state) => state.language), useTypedDispatch()];
	const languageOption = [
		{ component: <Text>English</Text>, key: 1, label: Language.English },
		{ component: <Text>suomi</Text>, key: 2, label: Language.Finnish },
		{ component: <Text>svenska</Text>, key: 3, label: Language.Swedish },
	];

	return (
		<>
			<View style={SettingsMenuStyles.BlockContainer}>
				<Text style={SettingsMenuStyles.BlockText}>{languages["Language"][language].toUpperCase()}</Text>
			</View>
			<View style={SettingsMenuStyles.SettingContainer}>
				<Text style={SettingsMenuStyles.BlockText}>{languages["Change language"][language]}</Text>
				<ModalSelector
					cancelText={languages["Cancel"][language].toLowerCase()}
					data={languageOption}
					initValue={language}
					initValueTextStyle={Styles.initValueTextStyle}
					onChange={async (option: { label: Language }) => {
						await dispatch(changeLanguage(option.label));
					}}
				/>
			</View>
		</>
	);
};
export default LanguageSelect;
