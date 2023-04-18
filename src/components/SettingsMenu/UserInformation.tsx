import { useState } from "react";
import { Alert, Button, Text, TextInput, View, TouchableOpacity } from "react-native";
import { languages } from "../../languages";
import { identifyUser, resetUser } from "../../reducers/user-reducer";
import { useTypedDispatch, useTypedSelector } from "../../store";
import SettingsMenuStyles from "../../styles/SettingsMenuStyles";
import theme from "../../styles/theme";

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
				<Text style={SettingsMenuStyles.BlockText}>UserID</Text>
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
