import { useEffect, useState } from "react";
import { Button, Text, TextInput, View, TouchableOpacity, Alert } from "react-native";
import { languages } from "../../languages";
import { identifyUser, resetUser, setUsername } from "../../reducers/user-reducer";
import { useTypedDispatch, useTypedSelector } from "../../store";
import settingsMenuStyles from "../../styles/settingsMenuStyles";
import theme from "../../styles/theme";
import EmptyMenuBlock from "./EmptyMenuBlock";

/**
 * A settings menu block for user information.
 *
 * @returns {JSX.Element} A new UserInformation component.
 */
const UserInformation = (): JSX.Element => {
	const [username, userId, language, routeActive] = useTypedSelector((state) => [
		state.user.username,
		state.user.userId,
		state.language,
		state.route.active,
	]);
	const alertRouteIsActive = () => {
		Alert.alert(
			languages["Route is currently active"][language],
			languages["UserID can not be reset while route is active. End route route first and try again"][language],
			[
				{
					text: languages["OK"][language],
				},
			]
		);
	};
	const dispatch = useTypedDispatch();
	const alertUserIDReset = () => {
		Alert.alert(
			languages["Resetting the userID"][language],
			languages["Do you really want to reset the userID?"][language],
			[
				{
					text: languages["Cancel"][language],
				},
				{
					onPress: async () => {
						await dispatch(resetUser());
						await dispatch(identifyUser());
					},
					text: languages["Reset"][language],
				},
			]
		);
	};
	const [localUsername, setLocalUsername] = useState<string>(username);
	const userInfo = languages["User information"][language].toUpperCase();

	useEffect(() => {
		dispatch(setUsername(localUsername));
	}, [localUsername]);

	return (
		<>
			<View style={settingsMenuStyles.greySettingsMenuBlock}>
				<Text style={settingsMenuStyles.blockText}>{userInfo}</Text>
			</View>
			<View style={settingsMenuStyles.whiteSettingsMenuBlockBottomBorder}>
				<Text style={settingsMenuStyles.blockText}>{languages["Type username"][language]}</Text>
				<TextInput
					onChangeText={setLocalUsername}
					placeholder={languages["Type username"][language]}
					style={settingsMenuStyles.userInformation}
					value={localUsername}
				/>
			</View>
			<TouchableOpacity style={settingsMenuStyles.whiteSettingsMenuBlockBottomBorder}>
				<Text style={settingsMenuStyles.blockText}>UserID</Text>
				<Text
					style={{
						color: "dimgrey",
						fontSize: 12,
						height: 40,
						textAlign: "right",
						textAlignVertical: "center",
					}}
				>
					{userId}
				</Text>
			</TouchableOpacity>
			<View style={settingsMenuStyles.whiteSettingsMenuBlockBottomBorder}>
				<Text style={settingsMenuStyles.attentionText}>{languages["Reset UserID"][language]}</Text>
				<Button
					color={theme.colors.attentionColor}
					onPress={() => (routeActive ? alertRouteIsActive() : alertUserIDReset())}
					title={languages["Reset"][language]}
				/>
			</View>
			<View style={settingsMenuStyles.greySettingsMenuBlock}>
				<Text style={settingsMenuStyles.blockText}>{languages["Tap your UserID to copy it"][language]}</Text>
			</View>
			<EmptyMenuBlock />
		</>
	);
};

export default UserInformation;
