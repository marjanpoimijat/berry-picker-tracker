import { useState } from "react";
import { View } from "react-native";
import { languages } from "../../languages";
import { removeAllTrackedUsers, updateTrackedUser } from "../../reducers/tracker-users-reducer";
import { useTypedDispatch, useTypedSelector } from "../../store";
import Styles from "../../styles";
import theme from "../../styles/theme";
import { createAlert } from "../../utils/alert";
import getTrackedUsersList from "../../utils/list";
import MasterButton from "./MasterButton";

/**
 * Contains master toggle buttons to control all tracked users.
 *
 * @returns {JSX.Element} A new MasterButtonsContainer component.
 */
const MasterButtonsContainer = (): JSX.Element => {
	const language = useTypedSelector((state) => state.language);
	const trackedUsers = useTypedSelector((state) => state.trackedUsers);
	const users = getTrackedUsersList(trackedUsers);
	const [locationsVisible, setLocationsVisible] = useState<boolean>(true);
	const [routesVisible, setRoutesVisible] = useState<boolean>(true);
	const dispatch = useTypedDispatch();

	const handleShowButtonPress = () => {
		setLocationsVisible(!locationsVisible);
		setRoutesVisible(!routesVisible);
		users.map((user) =>
			dispatch(
				updateTrackedUser({
					locationVisible: !locationsVisible,
					routeVisible: !locationsVisible,
					userId: user.userId,
				})
			)
		);
	};

	const handleRemoveButtonPress = () => {
		createAlert({
			cancellable: true,
			confirmText: languages["Remove"][language],
			infoText: languages["Do you really want to remove all users from the list?"][language],
			onPress: () => dispatch(removeAllTrackedUsers()),
			title: languages["Removing all tracked users"][language],
		});
	};

	return (
		<View style={Styles.trackUsersMasterButtonContainer}>
			<MasterButton
				handlePress={handleShowButtonPress}
				iconName={locationsVisible ? "eye" : "eye-slash"}
				text={languages["Show"][language]}
				toggled={!locationsVisible}
			/>
			<MasterButton
				disabled={!routesVisible}
				handlePress={() => console.log("")}
				iconName={"route"}
				text={languages["Route"][language]}
				toggled={!routesVisible}
			/>
			<MasterButton
				color={theme.colors.buttonRemoveColor}
				handlePress={handleRemoveButtonPress}
				iconName={"trash-alt"}
				text={languages["Remove"][language]}
			/>
		</View>
	);
};

export default MasterButtonsContainer;
