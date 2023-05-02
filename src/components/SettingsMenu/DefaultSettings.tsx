import { Text, View, Button } from "react-native";
import { languages } from "../../languages";
import { changeDefaultSettings } from "../../reducers/user-reducer";
import { useTypedSelector, useTypedDispatch } from "../../store";
import settingsMenuStyles from "../../styles/settingsMenuStyles";
import theme from "../../styles/theme";
import { createAlert } from "../../utils/alert";
import EmptyMenuBlock from "./EmptyMenuBlock";

/**
 * A settings menu block for reverting back to the default settings.
 *
 * @returns {JSX.Element} A new DefaultSettings component.
 */
const DefaultSettings = (): JSX.Element => {
	const [language] = [useTypedSelector((state) => state.language)];
	const dispatch = useTypedDispatch();

	const defaultSettings = languages["Default settings"][language].toUpperCase();

	const alertSettingsReset = () => {
		createAlert({
			cancellable: true,
			confirmText: languages["Reset settings"][language],
			infoText: languages["Do you really want to reset the settings?"][language],
			onPress: async () => {
				await dispatch(changeDefaultSettings());
			},
			title: languages["Resetting the settings"][language],
		});
	};

	return (
		<>
			<View style={settingsMenuStyles.greySettingsMenuBlock}>
				<Text style={settingsMenuStyles.blockText}>{defaultSettings}</Text>
			</View>
			<View style={settingsMenuStyles.whiteSettingsMenuBlockBottomBorder}>
				<Text style={settingsMenuStyles.attentionText}>{languages["Reset settings to default"][language]}</Text>
				<Button
					color={theme.colors.attentionColor}
					onPress={() => alertSettingsReset()}
					title={languages["Reset settings"][language]}
				/>
			</View>
			<EmptyMenuBlock />
		</>
	);
};

export default DefaultSettings;
