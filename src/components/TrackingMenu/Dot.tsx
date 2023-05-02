import { View } from "react-native";
import Styles from "../../styles";
import { DotProps } from "../../types";
import { getColor } from "../../utils/user-colors";

/**
 * A colored dot associated with each user.
 *
 * @param {string} id The userID
 * @returns {JSX.Element} A new Dot component.
 */
const Dot = ({ id }: DotProps): JSX.Element => (
	<View style={Styles.trackedUserDetailsDotContainer}>
		<View
			style={{
				...Styles.trackedUserDetailsDot,
				backgroundColor: getColor(id),
			}}
		/>
	</View>
);

export default Dot;
