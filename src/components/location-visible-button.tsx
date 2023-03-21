import { TouchableOpacity } from "react-native";
import { LocationVisibleButtonProps } from "../types";
import Button from "./button";

const LocationVisibleButton = ({ locationVisible, handleLocationVisibleChange }: LocationVisibleButtonProps) => (
	<TouchableOpacity onPress={() => handleLocationVisibleChange()}>
		{locationVisible ? (
			<Button
				disabled={!locationVisible}
				iconName="eye"
			/>
		) : (
			<Button
				disabled={!locationVisible}
				iconName="eye-slash"
			/>
		)}
	</TouchableOpacity>
);

export default LocationVisibleButton;
