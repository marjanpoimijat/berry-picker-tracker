import Icon from "react-native-vector-icons/FontAwesome5";
import { ButtonIconProps } from "../../types";
import theme from "../../styles/theme";

/**
 * A generic icon button.
 *
 * @param {string} color The color of the button as a hex code(optional).
 * @param {boolean} disabled Button disabled status.
 * @param {string} iconName The name of the FontAwesome5 icon to be used.
 * @returns {JSX.Element} A new Button component.
 */
const ButtonIcon = ({ color, disabled, iconName }: ButtonIconProps): JSX.Element => (
	<Icon
		color={disabled ? theme.colors.buttonToggledColor : color ?? "black"}
		name={iconName}
		size={19}
		style={{ marginLeft: 20 }}
	/>
);

export default ButtonIcon;
