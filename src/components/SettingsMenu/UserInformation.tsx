import { useEffect, useState } from "react";
import { Button, Text, TextInput, View, TouchableOpacity } from "react-native";
import { languages } from "../../languages";
import { identifyUser, resetUser } from "../../reducers/user-reducer";
import { useTypedDispatch, useTypedSelector } from "../../store";
import SettingsMenuStyles from "../../styles/SettingsMenuStyles";
import { createAlert } from "../../utils/alert";
import theme from "../../styles/theme";
import { setUsername } from "../../reducers/user-reducer";

/**
 * Renders the settings menu block for changing the user information
 *
 * @returns {JSX.Element}  A new UserInformation component
 */
const UserInformation = (): JSX.Element => {
	const [username, userId, language, routeActive] = useTypedSelector((state) => [
		state.user.username,
		state.user.userId,
		state.language,
		state.route.active,
	]);
	const resetWhileRouteActive = "UserID can not be reset while route is active. End route route first and try again";
	const alertRouteIsActive = () => {
		createAlert({
			cancellable: false,
			confirmText: languages["OK"][language],
			infoText: languages[`${resetWhileRouteActive}`][language],
			onPress: () => null,
			title: languages["Route is currently active"][language],
		});
	};
	const dispatch = useTypedDispatch();
	const alertUserIDReset = () => {
		createAlert({
			cancellable: true,
			confirmText: languages["Reset"][language],
			infoText: languages["Do you really want to reset the userID?"][language],
			onPress: async () => {
				await dispatch(resetUser());
				await dispatch(identifyUser());
			},
			title: languages["Resetting the userID"][language],
		});
	};

	const [localUsername, setLocalUsername] = useState<string>(username);
	const userInfo = languages["User information"][language].toUpperCase();

	useEffect(() => {
		dispatch(setUsername(localUsername));
		console.log([localUsername]);
	}, [localUsername]);

	return (
		<>
			<View style={SettingsMenuStyles.GreySettingsMenuBlock}>
				<Text style={SettingsMenuStyles.BlockText}>{userInfo}</Text>
			</View>
			<View style={SettingsMenuStyles.WhiteSettingsMenuBlockBottomBorder}>
				<Text style={SettingsMenuStyles.BlockText}>{languages["Type username"][language]}</Text>
				<TextInput
					onChangeText={setLocalUsername}
					placeholder={languages["Type username"][language]}
					style={SettingsMenuStyles.UserInformation}
					value={localUsername}
				/>
			</View>
			<TouchableOpacity style={SettingsMenuStyles.WhiteSettingsMenuBlockBottomBorder}>
				<Text style={SettingsMenuStyles.UserInformation}>UserID</Text>
				<Text style={SettingsMenuStyles.UserInformation}>{userId}</Text>
			</TouchableOpacity>
			<View style={SettingsMenuStyles.WhiteSettingsMenuBlockBottomBorder}>
				<Text style={SettingsMenuStyles.AttentionText}>{languages["Reset UserID"][language]}</Text>
				<Button
					color={theme.colors.attentionColor}
					onPress={() => (routeActive ? alertRouteIsActive() : alertUserIDReset())}
					title={languages["Reset"][language]}
				/>
			</View>
			<View style={SettingsMenuStyles.GreySettingsMenuBlock}>
				<Text style={SettingsMenuStyles.BlockText}>{languages["Tap your UserID to copy it"][language]}</Text>
			</View>
			<View style={SettingsMenuStyles.GreySettingsMenuBlock}>
				<Text style={SettingsMenuStyles.BlockText}>{null}</Text>
			</View>
		</>
	);
};
export default UserInformation;
