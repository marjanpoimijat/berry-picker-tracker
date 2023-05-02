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
import { toggleRouteMasterButton, toggleShowMasterButton } from "../../reducers/ui-reducer";

/**
 * Contains master toggle buttons to control all tracked users.
 *
 * @returns {JSX.Element} A new MasterButtonsContainer component.
 */
const MasterButtonsContainer = (): JSX.Element => {
	const language = useTypedSelector((state) => state.language);
	const trackedUsers = useTypedSelector((state) => state.trackedUsers);
	const users = getTrackedUsersList(trackedUsers);
	const showButtonToggled = useTypedSelector((state) => state.ui.showButtonToggled);
	const routeButtonToggled = useTypedSelector((state) => state.ui.routeButtonToggled);
	const [allLocationsVisible, setAllLocationsVisible] = useState<boolean>(showButtonToggled);
	const [allRoutesVisible, setAllRoutesVisible] = useState<boolean>(routeButtonToggled);
	const dispatch = useTypedDispatch();

	const handleShowButtonPress = () => {
		setAllLocationsVisible(!allLocationsVisible);
		dispatch(toggleShowMasterButton(!showButtonToggled));
		if (allLocationsVisible) {
			setAllRoutesVisible(false);
			dispatch(toggleRouteMasterButton(false));
			users.map((user) =>
				dispatch(
					updateTrackedUser({
						locationVisible: false,
						routeVisible: false,
						userId: user.userId,
					})
				)
			);
		} else {
			users.map((user) =>
				dispatch(
					updateTrackedUser({
						locationVisible: !allLocationsVisible,
						routeVisible: allRoutesVisible,
						userId: user.userId,
					})
				)
			);
		}
	};

	const handleRouteButtonPress = () => {
		setAllLocationsVisible(true);
		setAllRoutesVisible(!allRoutesVisible);
		dispatch(toggleRouteMasterButton(!routeButtonToggled));
		users.map((user) =>
			dispatch(
				updateTrackedUser({
					locationVisible: true,
					routeVisible: !allRoutesVisible,
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
				iconName={allLocationsVisible ? "eye" : "eye-slash"}
				text={languages["Show"][language]}
				toggled={!allLocationsVisible}
			/>
			<MasterButton
				disabled={!allLocationsVisible}
				handlePress={handleRouteButtonPress}
				iconName={"route"}
				text={languages["Route"][language]}
				toggled={!allRoutesVisible}
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
