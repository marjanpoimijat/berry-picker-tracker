import { TouchableOpacity } from "react-native";
import { RemoveButtonProps } from "../types";
import Button from "./button";

const RemoveButton = ({ handleRemoveButtonPress }: RemoveButtonProps) => (
	<TouchableOpacity onPress={() => handleRemoveButtonPress()}>
		<Button
			disabled={false}
			iconName="trash-alt"
		/>
	</TouchableOpacity>
);

export default RemoveButton;
