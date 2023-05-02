import { Text, View } from "react-native";
import { languages } from "../../languages";
import { useTypedSelector } from "../../store";
import SettingsMenuStyles from "../../styles/SettingsMenuStyles";
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
			<View style={SettingsMenuStyles.GreySettingsMenuBlock}>
				<Text style={SettingsMenuStyles.BlockText}>{languages["Battery use"][language].toUpperCase()}</Text>
			</View>
			<View style={SettingsMenuStyles.WhiteSettingsMenuBlockBottomBorder}>
				<Text style={SettingsMenuStyles.BlockText}>{languages["Change battery use"][language]}</Text>
				<BatteryUseSelector />
			</View>
			<EmptyMenuBlock />
		</>
	);
};

export default BatteryUse;
