import { View } from "react-native";
import SettingsMenuStyles from "../../styles/SettingsMenuStyles";

/**
 * A gray, empty menu block component for stylistic reasons.
 *
 * @returns {JSX.Element} A new EmptyMenuBlock component.
 */
const EmptyMenuBlock = (): JSX.Element => <View style={SettingsMenuStyles.GreySettingsMenuBlock} />;

export default EmptyMenuBlock;
