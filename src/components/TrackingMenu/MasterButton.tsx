import { Text, TouchableOpacity, View } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome5";
import Styles from "../../styles";
import { MasterButtonProps } from "../../types";

const MasterButton = ({ iconName, text }: MasterButtonProps) => {
	return (
		<View style={Styles.masterButtonContainer}>
			<TouchableOpacity onPress={() => console.log("")}>
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
