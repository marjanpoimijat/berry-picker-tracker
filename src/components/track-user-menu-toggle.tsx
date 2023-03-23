import { Text, TouchableOpacity, View } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome5";
import Styles from "../styles";

/**
 * Master toggle for all users.
 *
 * @returns {JSX.Element} A new TrackUserMenuToggle component.
 */
const TrackUserMenuToggle = (): JSX.Element => (
	<View style={Styles.trackUsersMasterButtonContainer}>
		<View style={Styles.masterButtonContainer}>
			<TouchableOpacity onPress={() => console.log("")}>
				<Icon
					name="eye"
					style={Styles.masterButtonIcon}
				/>
				<Text style={Styles.masterButtonText}>Show</Text>
			</TouchableOpacity>
		</View>
		<View style={Styles.masterButtonContainer}>
			<TouchableOpacity onPress={() => console.log("")}>
				<Icon
					name="route"
					style={Styles.masterButtonIcon}
				/>
				<Text style={Styles.masterButtonText}>Route</Text>
			</TouchableOpacity>
		</View>
		<View style={Styles.masterButtonContainer}>
			<TouchableOpacity onPress={() => console.log("")}>
				<Icon
					name="trash-alt"
					style={Styles.masterButtonIcon}
				/>
				<Text style={Styles.masterButtonText}>Remove</Text>
			</TouchableOpacity>
		</View>
	</View>
);

export default TrackUserMenuToggle;
