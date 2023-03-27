import Icon from "react-native-vector-icons/FontAwesome5";
import { ButtonIconProps } from "../../types";

/**
 * A generic icon button.
 *
 * @param {boolean} disabled Button disabled status.
 * @param {string} iconName The name of the FontAwesome5 icon to be used.
 * @returns {JSX.Element} A new Button component.
 */
const ButtonIcon = ({ disabled, iconName }: ButtonIconProps): JSX.Element => (
	<Icon
		color={disabled ? "gray" : "black"}
		name={iconName}
		size={19}
		style={{ marginLeft: 20 }}
	/>
);

export default ButtonIcon;
