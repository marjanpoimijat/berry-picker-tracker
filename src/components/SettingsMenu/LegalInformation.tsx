import { Text, View } from "react-native";
import { repoBaseUrl } from "../../constants";

import { languages } from "../../languages";

import { useTypedSelector } from "../../store";
import SettingsMenuStyles from "../../styles/SettingsMenuStyles";
import LinkBox from "./LinkBox";

const LegalInformation = (): JSX.Element => {
	const [language] = useTypedSelector((state) => [state.language]);

	const frontend = `${repoBaseUrl}/berry-picker-tracker/tree/main/licenses`;
	const backend = `${repoBaseUrl}/berry-picker-tracker-server/tree/main/licenses`;
	const privacyPolicy = `${repoBaseUrl}/berry-picker-tracker-docs/blob/main/privacy_policies.md`;
	const legalInfoUpperCase = languages["Legal information"][language].toUpperCase();
	const PrivacyLinkInfo = languages["Links to privacy policy and licenses"][language];

	return (
		<>
			<View style={SettingsMenuStyles.GreySettingsMenuBlock}>
				<Text style={SettingsMenuStyles.BlockText}>{legalInfoUpperCase}</Text>
			</View>
			<LinkBox
				link={frontend}
				text={languages["Frontend licenses"][language]}
			/>
			<LinkBox
				link={backend}
				text={languages["Backend licenses"][language]}
			/>
			<LinkBox
				link={privacyPolicy}
				text={languages["Privacy policy"][language]}
			/>
			<View style={SettingsMenuStyles.GreySettingsMenuBlock}>
				<Text style={SettingsMenuStyles.BlockText}>{PrivacyLinkInfo}</Text>
			</View>
		</>
	);
};
export default LegalInformation;
