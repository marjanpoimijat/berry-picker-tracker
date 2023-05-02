import { useState } from "react";
import { Switch } from "react-native";

/**
 * A toggle for toggling a setting on or off in the settings menu.
 *
 * @returns {JSX.Element} A new SettingsToggle component.
 */
const SettingsToggle = (): JSX.Element => {
	const [isEnabled, setIsEnabled] = useState(false);
	const toggleSwitch = () => setIsEnabled((previousState) => !previousState);

	return (
		<Switch
			ios_backgroundColor="#3e3e3e"
			onValueChange={toggleSwitch}
			thumbColor={isEnabled ? "#b0c4de" : "#f4f3f4"}
			trackColor={{ false: "#767577", true: "#008b8b" }}
			value={isEnabled}
		></Switch>
	);
};

export default SettingsToggle;
