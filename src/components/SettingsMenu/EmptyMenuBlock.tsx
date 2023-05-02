import { View } from "react-native";
import settingsMenuStyles from "../../styles/settingsMenuStyles";

/**
 * A gray, empty menu block component for stylistic reasons.
 *
 * @returns {JSX.Element} A new EmptyMenuBlock component.
 */
const EmptyMenuBlock = (): JSX.Element => <View style={settingsMenuStyles.greySettingsMenuBlock} />;

export default EmptyMenuBlock;
