import { TouchableOpacity } from "react-native";
import { RemoveButtonProps } from "../types";
import Button from "./Button";

/**
 * A button used to remove a tracked user from the Tracking menu.
 *
 * @param {function} handleRemoveButtonPress A function to handle the button being pressed.
 * @returns {JSX.Element} A new RemoveButton component.
 */
const RemoveButton = ({ handleRemoveButtonPress }: RemoveButtonProps): JSX.Element => (
	<TouchableOpacity onPress={() => handleRemoveButtonPress()}>
		<Button
			disabled={false}
			iconName="trash-alt"
		/>
	</TouchableOpacity>
);

export default RemoveButton;
