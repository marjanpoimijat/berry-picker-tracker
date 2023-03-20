import { TextInput, View } from "react-native";
import { InputContainerProps } from "../../types";
import { languages } from "../languages";
import { useTypedSelector } from "../store";
import Styles from "../styles";
import RouteButton from "./route-button";

/**
 * Input container where user can search and update other users latest route
 * from the server at find-user-route-screen.
 */
const InputContainer = ({
	setUserId,
	userId,
	findUserRoute,
	buttonText,
}: InputContainerProps): JSX.Element => {
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
