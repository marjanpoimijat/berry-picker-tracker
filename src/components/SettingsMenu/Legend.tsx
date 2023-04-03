import { Text, View } from "react-native";
import { Icon } from "react-native-vector-icons/Icon";
import { languages } from "../../languages";
import { useTypedSelector } from "../../store";
import { baseUrl } from "../../constants";
import { Linking } from "react-native";

const Legend = () => {
	const [language] = [useTypedSelector((state) => state.language)];

	return (
		<View>
			<Text>{languages["Download link to National Land Survey of Finland map legend information"][language]}</Text>
			<Text>{languages["Map legend"][language]}</Text>
			<Icon
				name="chevron-right"
				onPress={() => Linking.openURL(`${baseUrl}/get-legend/`)}
			/>
			<Text>{languages["Download map legend"][language]}</Text>
		</View>
	);
};
export default Legend;
