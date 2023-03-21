import Icon from "react-native-vector-icons/FontAwesome5";
import { ButtonProps } from "../types";

const Button = ({ disabled, iconName }: ButtonProps) => (
	<Icon
		color={disabled ? "gray" : "black"}
		name={iconName}
		size={19}
		style={{ marginLeft: 20 }}
	/>
);

export default Button;
