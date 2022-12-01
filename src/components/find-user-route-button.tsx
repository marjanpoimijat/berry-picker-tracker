import { Text, View } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { Link } from "react-router-native";
import NaviTabStyles from "../navi-tab-styles";

const FindUserButton = ({ text }: { text: string }): JSX.Element => {
	return (
		<Link to="/findroute" underlayColor="#ffffff00">
			<View style={NaviTabStyles.buttonStyle}>
				<Icon name="location-arrow" style={NaviTabStyles.iconStyle} />
				<Text style={NaviTabStyles.textStyle}>{text}</Text>
			</View>
		</Link>
	);
};

export default FindUserButton;
