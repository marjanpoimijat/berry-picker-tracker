import { View } from "react-native";
import { languages } from "../../languages";
import { useTypedSelector } from "../../store";
import Styles from "../../styles";
import MasterButton from "./MasterButton";

/**
 * Master toggle for all users.
 *
 * @returns {JSX.Element} A new TrackUserMenuToggle component.
 */
const MasterButtonsContainer = (): JSX.Element => {
	const language = useTypedSelector((state) => state.language);
	return (
		<View style={Styles.trackUsersMasterButtonContainer}>
			<MasterButton
				iconName={"eye"}
				text={languages["Show"][language]}
			/>
			<MasterButton
				iconName={"route"}
				text={languages["Route"][language]}
			/>
			<MasterButton
				iconName={"trash-alt"}
				text={languages["Remove"][language]}
			/>
		</View>
	);
};

export default MasterButtonsContainer;
