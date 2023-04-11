import { Text, View, Button } from "react-native";
import { languages } from "../../languages";
import SettingsMenuStyles from "../../styles/SettingsMenuStyles";
import { useTypedSelector, useTypedDispatch } from "../../store";
import { changeDefaultSettings } from "../../reducers/user-reducer";
import { createAlert } from "../../utils/alert";

const ResetSettings = (): JSX.Element => {
	const [language] = [useTypedSelector((state) => state.language)];
	const dispatch = useTypedDispatch();

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
			<View style={SettingsMenuStyles.GreySettingsMenuBlock}>
				<Text style={SettingsMenuStyles.BlockText}>{languages["Default settings"][language]}</Text>
			</View>
			<View style={SettingsMenuStyles.WhiteSettingsMenuBlockBottomBorder}>
				<Text style={{ color: "red" }}>{languages["Reset settings to default"][language]}</Text>
				<Button
					color="red"
					onPress={() => alertSettingsReset()}
					title={languages["Reset settings"][language]}
				/>
			</View>
			<View style={SettingsMenuStyles.GreySettingsMenuBlock}>
				<Text style={SettingsMenuStyles.BlockText}>{null}</Text>
			</View>
		</>
	);
};
export default ResetSettings;
