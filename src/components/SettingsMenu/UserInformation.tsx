import { useState } from "react";
import { Alert, Button, Text, TextInput, View, TouchableOpacity } from "react-native";
import { languages } from "../../languages";
import { identifyUser, resetUser } from "../../reducers/user-reducer";
import { useTypedDispatch, useTypedSelector } from "../../store";

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
	return (
		<View>
			<TextInput
				onChangeText={setLocalUsername}
				placeholder={languages["Type username"][language]}
				style={{ color: "dimgrey", fontSize: 12, textAlign: "right" }}
				value={localUsername}
			/>
			<TouchableOpacity>
				<Text style={{ color: "dimgrey", fontSize: 12 }}>{userId}</Text>
			</TouchableOpacity>
			<Button
				color="red"
				onPress={() => (routeActive ? alertRouteIsActive() : alertUserIDReset())}
				title={languages["Reset"][language]}
			/>
		</View>
	);
};
export default UserInformation;
