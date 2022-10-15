import { View } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome5";

const CoffeeScreen = () => {
	return (
		<View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
			<Icon name="coffee" size={60} color="lightblue" />
			<Icon name="hamburger" size={60} color="brown" />
		</View>
	);
};

export default CoffeeScreen;
