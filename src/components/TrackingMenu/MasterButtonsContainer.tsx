import { View } from "react-native";
import { languages } from "../../languages";
import { removeAllTrackedUsers } from "../../reducers/tracker-users-reducer";
import { useTypedDispatch, useTypedSelector } from "../../store";
import Styles from "../../styles";
import { createAlert } from "../../utils/alert";
import MasterButton from "./MasterButton";

/**
 * Contains master toggle buttons to control all tracked users.
 *
 * @returns {JSX.Element} A new MasterButtonsContainer component.
 */
const MasterButtonsContainer = (): JSX.Element => {
	const language = useTypedSelector((state) => state.language);
	const dispatch = useTypedDispatch();

	const handleRemoveButtonPress = () =>
		createAlert({
			cancellable: true,
			confirmText: languages["Remove"][language],
			infoText: languages["Do you really want to remove all users from the list?"][language],
			onPress: () => dispatch(removeAllTrackedUsers()),
			title: languages["Removing all tracked users"][language],
		});

	return (
		<View style={Styles.trackUsersMasterButtonContainer}>
			<MasterButton
				handlePress={() => console.log("")}
				iconName={"eye"}
				text={languages["Show"][language]}
			/>
			<MasterButton
				handlePress={() => console.log("")}
				iconName={"route"}
				text={languages["Route"][language]}
			/>
			<MasterButton
				handlePress={handleRemoveButtonPress}
				iconName={"trash-alt"}
				text={languages["Remove"][language]}
			/>
		</View>
	);
};

export default MasterButtonsContainer;
