import { TextInput, View } from "react-native";
import Styles from "../styles";
import RouteButton from "./route-button";

interface Props {
	/** Sets user ID state at find-user-route-screen */
	setUserId: React.Dispatch<React.SetStateAction<string>>;
	/** User ID */
	userId: string;
	/** Function to search users latest route from the server */
	findUserRoute: () => void;
	/** Text on a input button */
	buttonText: string;
}

/**
 * Input container where user can search and update other users latest route
 * from the server at find-user-route-screen.
 */
const InputContainer = ({
	setUserId,
	userId,
	findUserRoute,
	buttonText,
}: Props): JSX.Element => {
	return (
		<View style={Styles.inputContainer}>
			<TextInput
				style={Styles.inputField}
				onChangeText={setUserId}
				value={userId}
				placeholder="userID"
			/>
			<RouteButton onPress={findUserRoute} text={buttonText} />
		</View>
	);
};

export default InputContainer;
