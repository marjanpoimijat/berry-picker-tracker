import { Text, View, Button, Alert } from "react-native";
import { languages } from "../../languages";
import SettingsMenuStyles from "../../styles/SettingsMenuStyles";
import { useTypedSelector, useTypedDispatch } from "../../store";
import { changeDefaultSettings } from "../../reducers/user-reducer";

const ResetSettings = (): JSX.Element => {
	const [language] = [useTypedSelector((state) => state.language)];
	const dispatch = useTypedDispatch();

	const alertSettingsReset = () => {
		Alert.alert(
			languages["Resetting the settings"][language],
			languages["Do you really want to reset the settings?"][language],
			[
				{
					text: languages["Cancel"][language],
				},
				{
					onPress: async () => {
						await dispatch(changeDefaultSettings());
					},
					text: languages["Reset settings"][language],
				},
			]
		);
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
