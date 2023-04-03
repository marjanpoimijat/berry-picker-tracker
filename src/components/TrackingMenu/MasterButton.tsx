import { Text, TouchableOpacity, View } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome5";
import Styles from "../../styles";
import { MasterButtonProps } from "../../types";

const MasterButton = ({ handlePress, iconName, text }: MasterButtonProps) => {
	return (
		<View style={Styles.masterButtonContainer}>
			<TouchableOpacity onPress={handlePress}>
				<Icon
					name={iconName}
					style={Styles.masterButtonIcon}
				/>
				<Text style={Styles.masterButtonText}>{text}</Text>
			</TouchableOpacity>
		</View>
	);
};

export default MasterButton;
