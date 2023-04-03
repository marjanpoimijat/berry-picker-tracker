import { Text, View } from "react-native";
import Styles from "../../styles";
import { useTypedSelector } from "../../store";
import { languages } from "../../languages";

/**
 * A helper text to be displayed in the Tracking menu when the user list is empty.
 *
 * @returns {JSX.Element} A new NoTrackedUsersText component.
 */
const NoTrackedUsersText = (): JSX.Element => {
	const language = useTypedSelector((state) => state.language);

	return (
		<View style={Styles.noTrackedUsersTextContainer}>
			<Text style={Styles.noTrackedUsersText}>{languages["No tracked users yet."][language]}</Text>
		</View>
	);
};

export default NoTrackedUsersText;
