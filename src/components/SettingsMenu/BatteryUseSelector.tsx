import { Text } from "react-native";
import ModalSelector from "react-native-modal-selector";
import { languages } from "../../languages";
import { BatteryMode } from "../../types";
import { useTypedDispatch, useTypedSelector } from "../../store";
import Styles from "../../styles";
import { changeBatteryMode } from "../../reducers/user-reducer";
/**
 *
 * @returns {JSX.Element}  A new BatteryMode component
 */
const BatteryUseSelector = (): JSX.Element => {
	const [language, dispatch] = [useTypedSelector((state) => state.language), useTypedDispatch()];
	const batterySavingMode = languages["Battery saving mode"][language];
	const batteryOption = [
		{ component: <Text>{languages["Normal mode"][language]}</Text>, key: 1, label: BatteryMode.Normal },
		{ component: <Text>{batterySavingMode}</Text>, key: 2, label: BatteryMode.BatterySavingMode },
	];

	return (
		<>
			<ModalSelector
				cancelText={languages["Cancel"][language].toLowerCase()}
				data={batteryOption}
				initValue={languages["Normal"][language]}
				initValueTextStyle={Styles.initValueTextStyle}
				onChange={async (option: { label: BatteryMode }) => {
					await dispatch(changeBatteryMode(option.label));
				}}
			/>
		</>
	);
};
export default BatteryUseSelector;
