import { Text } from "react-native";
import ModalSelector from "react-native-modal-selector";
import { languages } from "../../languages";
import { changeLanguage } from "../../reducers/language-reducer";
import { useTypedDispatch, useTypedSelector } from "../../store";
import Styles from "../../styles";
import { Language } from "../../types";

/**
 * Renders selector for resetting settings to default
 *
 * @returns {JSX.Element}  A new Language component
 */
const LanguageSelect = (): JSX.Element => {
	const [language, dispatch] = [useTypedSelector((state) => state.language), useTypedDispatch()];
	const languageOption = [
		{ component: <Text>English</Text>, key: 1, label: Language.English },
		{ component: <Text>suomi</Text>, key: 2, label: Language.Finnish },
		{ component: <Text>svenska</Text>, key: 3, label: Language.Swedish },
	];

	return (
		<ModalSelector
			cancelText={languages["Cancel"][language].toLowerCase()}
			data={languageOption}
			initValue={language}
			initValueTextStyle={Styles.initValueTextStyle}
			onChange={async (option: { label: Language }) => {
				await dispatch(changeLanguage(option.label));
			}}
		/>
	);
};

export default LanguageSelect;
