import { Text, View } from "react-native";
import { languages } from "../../languages";
import { useTypedSelector } from "../../store";
import settingsMenuStyles from "../../styles/settingsMenuStyles";
import BatteryUseSelector from "./BatteryUseSelector";
import EmptyMenuBlock from "./EmptyMenuBlock";

/**
 * A settings menu block for changing the battery use.
 *
 * @returns {JSX.Element} A new BatteryUse component.
 */
export const BatteryUse = (): JSX.Element => {
	const language = useTypedSelector((state) => state.language);

	return (
		<>
			<View style={settingsMenuStyles.greySettingsMenuBlock}>
				<Text style={settingsMenuStyles.blockText}>{languages["Battery use"][language].toUpperCase()}</Text>
			</View>
			<View style={settingsMenuStyles.whiteSettingsMenuBlockBottomBorder}>
				<Text style={settingsMenuStyles.blockText}>{languages["Change battery use"][language]}</Text>
				<BatteryUseSelector />
			</View>
			<EmptyMenuBlock />
		</>
	);
};

export default BatteryUse;
