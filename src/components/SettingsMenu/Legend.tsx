import { Text, View } from "react-native";
import { languages } from "../../languages";
import SettingsMenuStyles from "../../styles/SettingsMenuStyles";
import { useTypedSelector } from "../../store";
import { baseUrl } from "../../constants";
import LinkBox from "./LinkBox";

const Legend = (): JSX.Element => {
	const [language] = [useTypedSelector((state) => state.language)];
	const legendInfo = languages["Download link to National Land Survey of Finland map legend information"][language];
	const legendTitle = languages["Map legend"][language].toUpperCase();
	return (
		<>
			<View style={SettingsMenuStyles.GreySettingsMenuBlock}>
				<Text style={SettingsMenuStyles.BlockText}>{legendTitle}</Text>
			</View>
			<LinkBox
				link={`${baseUrl}/get-legend/`}
				text={languages["Download map legend"][language]}
			/>
			<View style={SettingsMenuStyles.GreySettingsMenuBlock}>
				<Text style={SettingsMenuStyles.BlockText}>{legendInfo}</Text>
			</View>
			<View style={SettingsMenuStyles.GreySettingsMenuBlock}>
				<Text style={SettingsMenuStyles.BlockText}>{null}</Text>
			</View>
		</>
	);
};
export default Legend;
