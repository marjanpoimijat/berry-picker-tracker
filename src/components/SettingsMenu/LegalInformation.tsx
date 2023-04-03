import { Text, View, Linking } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome5";
import { repoBaseUrl } from "../../constants";

import { languages } from "../../languages";

import { useTypedDispatch, useTypedSelector } from "../../store";

const LegalInformation = (): JSX.Element => {
	const [language] = useTypedSelector((state) => [state.language]);

	const frontend = `${repoBaseUrl}/berry-picker-tracker/tree/main/licenses`;
	const backend = `${repoBaseUrl}/berry-picker-tracker-server/tree/main/licenses`;
	const privacyPolicy = `${repoBaseUrl}/berry-picker-tracker-docs/blob/main/privacy_policies.md`;

	return (
		<View>
			<Text>{languages["Links to privacy policy and licenses"][language]}</Text>
			<Text>{languages["Legal information"][language]}</Text>
			<Icon
				name="chevron-right"
				onPress={() => Linking.openURL(frontend)}
			/>

			<Text>{languages["Frontend licenses"][language]}</Text>
			<Icon
				name="chevron-right"
				onPress={() => Linking.openURL(backend)}
			/>
			<Text>{languages["Backend licenses"][language]}</Text>
			<Icon
				name="chevron-right"
				onPress={() => Linking.openURL(privacyPolicy)}
			/>
			<Text>{languages["Privacy policy"][language]}</Text>
		</View>
	);
};
export default LegalInformation;
