import { Text, View } from "react-native";
import { legendLink } from "../../constants";
import { languages } from "../../languages";
import { useTypedSelector } from "../../store";
import settingsMenuStyles from "../../styles/settingsMenuStyles";
import LinkBlock from "./LinkBlock";
import EmptyMenuBlock from "./EmptyMenuBlock";

/**
 * A settings menu block for the map legend.
 *
 * @returns {JSX.Element} A new MapLegend component.
 */
const MapLegend = (): JSX.Element => {
	const [language] = [useTypedSelector((state) => state.language)];
	const legendInfo = languages["Download link to National Land Survey of Finland map legend information"][language];
	const legendTitle = languages["Map legend"][language].toUpperCase();
	return (
		<>
			<View style={settingsMenuStyles.greySettingsMenuBlock}>
				<Text style={settingsMenuStyles.blockText}>{legendTitle}</Text>
			</View>
			<LinkBlock
				link={legendLink}
				text={languages["Download map legend"][language]}
			/>
			<View style={settingsMenuStyles.greySettingsMenuBlock}>
				<Text style={settingsMenuStyles.blockText}>{legendInfo}</Text>
			</View>
			<EmptyMenuBlock />
		</>
	);
};

export default MapLegend;
