import { Alert, View } from "react-native";
import { languages } from "../../languages";
import { removeAllTrackedUsers } from "../../reducers/tracker-users-reducer";
import { useTypedDispatch, useTypedSelector } from "../../store";
import Styles from "../../styles";
import MasterButton from "./MasterButton";

/**
 * Contains master toggle buttons to control all tracked users.
 *
 * @returns {JSX.Element} A new MasterButtonsContainer component.
 */
const MasterButtonsContainer = (): JSX.Element => {
	const language = useTypedSelector((state) => state.language);
	const dispatch = useTypedDispatch();

	const handleRemoveButtonPress = () => {
		Alert.alert(
			languages["Removing all tracked users"][language],
			languages["Do you really want to remove all users from the list?"][language],
			[
				{
					text: languages["Cancel"][language],
				},
				{
					onPress: () => {
						dispatch(removeAllTrackedUsers());
					},
					text: languages["Remove"][language],
				},
			]
		);
	};

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
