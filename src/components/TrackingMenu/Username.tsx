import { Text } from "react-native";
import Styles from "../../styles";
import { UsernameProps } from "../../types";

/**
 * A styled username of a tracked user.
 *
 * @param {string} username Username of the user.
 * @returns {JSX.Element} A new Username component.
 */
const Username = ({ username }: UsernameProps): JSX.Element => (
	<Text style={Styles.trackedUserDetailsUsername}>{username}</Text>
);

export default Username;
