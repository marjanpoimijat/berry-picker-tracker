import { Text, View } from "react-native";
import { repoBaseUrl } from "../../constants";
import { languages } from "../../languages";
import { useTypedSelector } from "../../store";
import settingsMenuStyles from "../../styles/settingsMenuStyles";
import LinkBlock from "./LinkBlock";
import EmptyMenuBlock from "./EmptyMenuBlock";

/**
 * A settings menu block for legal information.
 *
 * @returns {JSX.Element} A new LegalInformation component.
 */
const LegalInformation = (): JSX.Element => {
	const [language] = useTypedSelector((state) => [state.language]);

	const frontend = `${repoBaseUrl}/berry-picker-tracker/tree/main/licenses`;
	const backend = `${repoBaseUrl}/berry-picker-tracker-server/tree/main/licenses`;
	const privacyPolicy = `${repoBaseUrl}/berry-picker-tracker-docs/blob/main/privacy_policies.md`;
	const legalInfoUpperCase = languages["Legal information"][language].toUpperCase();
	const PrivacyLinkInfo = languages["Links to privacy policy and licenses"][language];

	return (
		<>
			<View style={settingsMenuStyles.greySettingsMenuBlock}>
				<Text style={settingsMenuStyles.blockText}>{legalInfoUpperCase}</Text>
			</View>
			<LinkBlock
				link={frontend}
				text={languages["Frontend licenses"][language]}
			/>
			<LinkBlock
				link={backend}
				text={languages["Backend licenses"][language]}
			/>
			<LinkBlock
				link={privacyPolicy}
				text={languages["Privacy policy"][language]}
			/>
			<View style={settingsMenuStyles.greySettingsMenuBlock}>
				<Text style={settingsMenuStyles.blockText}>{PrivacyLinkInfo}</Text>
			</View>
			<EmptyMenuBlock />
		</>
	);
};

export default LegalInformation;
