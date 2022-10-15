import { Text, View } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { Link } from "react-router-native";
import NaviTabStyles from "../navi-tab-styles";

const SettingsButton = ({ text }: { text: string }): JSX.Element => {
	return (
		<Link to="/settings" underlayColor="#ffffff00">
			<View style={NaviTabStyles.buttonStyle}>
				<Icon name="cog" style={NaviTabStyles.iconStyle} />
				<Text style={NaviTabStyles.textStyle}>{text}</Text>
			</View>
		</Link>
	);
};

export default SettingsButton;
