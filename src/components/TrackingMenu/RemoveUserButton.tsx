import { TouchableOpacity } from "react-native";
import { RemoveUserButtonProps } from "../../types";
import ButtonIcon from "./ButtonIcon";
import theme from "../../styles/theme";

/**
 * A button used to remove a tracked user from the Tracking menu.
 *
 * @param {function} handleRemoveUserButtonPress A function to handle the button being pressed.
 * @returns {JSX.Element} A new RemoveButton component.
 */
const RemoveUserButton = ({ handleRemoveUserButtonPress }: RemoveUserButtonProps): JSX.Element => (
	<TouchableOpacity onPress={() => handleRemoveUserButtonPress()}>
		<ButtonIcon
			color={theme.colors.buttonRemoveColor}
			disabled={false}
			iconName="trash-alt"
		/>
	</TouchableOpacity>
);

export default RemoveUserButton;
