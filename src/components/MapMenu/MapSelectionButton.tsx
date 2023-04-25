import { Image, Text, View, TouchableOpacity } from "react-native";
import { ButtonProps } from "../../types";
import Styles from "../../styles";

/**
 * MapSelection button which selects which map should be used in the app.
 *
 * @param {ImageSourcePropType} imageFile The image to be displayed on the button.
 * @param {function} onPress A function to handle the button being pressed.
 * @param {boolean} selected Selected status of the map button.
 * @param {string} text Text to be displayed on the butotn.
 * @returns {JSX.Element} A new MapSelectionButton component.
 */
const MapSelectionButton = ({ imageFile, onPress, selected, text }: ButtonProps): JSX.Element => (
	<View style={Styles.mapSelectionButton}>
		<TouchableOpacity
			onPress={onPress}
			style={{ alignItems: "center" }}
		>
			<Image
				source={imageFile}
				style={
					selected
						? { ...Styles.mapSelectionButtonImage, borderColor: "blue", borderWidth: 1.7 }
						: Styles.mapSelectionButtonImage
				}
			/>
			<Text style={Styles.buttonText}>{text}</Text>
		</TouchableOpacity>
	</View>
);

export default MapSelectionButton;
