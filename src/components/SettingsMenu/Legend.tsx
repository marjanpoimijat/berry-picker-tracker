import { Text, View } from "react-native";
import { languages } from "../../languages";
import Icon from "react-native-vector-icons/FontAwesome5";

import { useTypedSelector } from "../../store";
import { baseUrl } from "../../constants";
import { Linking } from "react-native";

const Legend = (): JSX.Element => {
	const [language] = [useTypedSelector((state) => state.language)];
	const text = languages["Download link to National Land Survey of Finland map legend information"][language];
	return (
		<View>
			<Text>{text}</Text>
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
