import { Text, View } from "react-native";

import ModalSelector from "react-native-modal-selector";
import { languages } from "../../languages";
import { useTypedDispatch, useTypedSelector } from "../../store";
import Styles from "../../styles";
import { changeTrackingInterval } from "../../reducers/user-reducer";
import SettingsMenuStyles from "../../styles/SettingsMenuStyles";

const FrequencySelect = (): JSX.Element => {
	const [language, dispatch] = [useTypedSelector((state) => state.language), useTypedDispatch()];
	const [currTrack] = useTypedSelector((state) => [state.user.trackingInterval]);
	let index = 0;
	const trackFreq = [
		{
			component: <Text>1 {languages["second"][language]}</Text>,
			key: index++,
			label: 1000,
		},
		{
			component: <Text>5 {languages["seconds"][language]}</Text>,
			key: index++,
			label: 5000,
		},
		{
			component: <Text>10 {languages["seconds"][language]}</Text>,
			key: index++,
			label: 10000,
		},
		{
			component: <Text>30 {languages["seconds"][language]}</Text>,
			key: index++,
			label: 30000,
		},
		{
			component: <Text>1 {languages["minute"][language]}</Text>,
			key: index++,
			label: 60000,
		},
	];

	return (
		<View style={SettingsMenuStyles.SettingContainer}>
			<Text>{languages["Waypoint tracking frequency"][language]}</Text>
			<ModalSelector
				cancelText={languages["Cancel"][language].toLowerCase()}
				data={trackFreq}
				initValue={currTrack.toString() + " s"}
				initValueTextStyle={Styles.initValueTextStyle}
				onChange={async (option: { label: number }) => {
					await dispatch(changeTrackingInterval(option.label));
				}}
			/>
		</View>
	);
};

/*
const SendingFrequencySelect = (): JSX.Element => {
	const [language, dispatch] = [useTypedSelector((state) => state.language), useTypedDispatch()];
	const languageOption = [
		{ component: <Text>English</Text>, key: 1, label: Language.English },
		{ component: <Text>suomi</Text>, key: 2, label: Language.Finnish },
		{ component: <Text>svenska</Text>, key: 3, label: Language.Swedish },
	];

	return (
		<ModalSelector
			cancelText={languages["Cancel"][language].toLowerCase()}
			data={languageOption}
			initValue={language}
			initValueTextStyle={Styles.initValueTextStyle}
			onChange={async (option: { label: Language }) => {
				await dispatch(changeLanguage(option.label));
			}}
		/>
	);
};
*/
export default FrequencySelect;
