import { View, StyleSheet } from "react-native";
import Button from "./Button";

const styles = StyleSheet.create({
	buttonContainer: {
		display: "flex",
		position: "absolute",
		alignSelf: "flex-start",
		marginLeft: 10,
		flexDirection: "column",
		bottom: 100,
	},
});

interface Props {
	resetRouteCoordinates: () => void;
	changeShowRoute: () => void;
	showRoute: boolean;
}

const RouteButtonContainer = ({
	resetRouteCoordinates,
	changeShowRoute,
	showRoute,
}: Props): JSX.Element => {
	return (
		<View style={styles.buttonContainer}>
			<Button onPress={resetRouteCoordinates} text={"Reset route"} />
			<Button
				onPress={changeShowRoute}
				text={showRoute ? "Hide route" : "Show route"}
			/>
		</View>
	);
};

export default RouteButtonContainer;
