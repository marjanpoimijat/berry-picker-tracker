import { TextInput, View } from "react-native";
import { languages } from "../languages";
import { useTypedSelector } from "../store";
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
	const language = useTypedSelector((state) => state.language);
	return (
		<View style={Styles.inputContainer}>
			<TextInput
				onChangeText={setUserId}
				placeholder={languages["UserID"][language]}
				style={Styles.inputField}
				value={userId}
			/>
			<RouteButton onPress={findUserRoute} text={buttonText} />
		</View>
	);
};

export default InputContainer;
