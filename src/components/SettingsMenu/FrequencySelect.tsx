import { Text } from "react-native";
import ModalSelector from "react-native-modal-selector";
import { languages } from "../../languages";
import { useTypedDispatch, useTypedSelector } from "../../store";
import Styles from "../../styles";
import {
	changeRefreshingFrequency,
	changeSendingFrequency,
	changeTrackingFrequency,
} from "../../reducers/user-reducer";

/**
 * Renders the selector for changing the tracking frequency
 * @returns {JSX.Element}  A new TrackingFrequency component
 */
export const TrackingFrequency = (): JSX.Element => {
	const [language, dispatch] = [useTypedSelector((state) => state.language), useTypedDispatch()];
	const [currTrack] = useTypedSelector((state) => [state.user.trackingFrequency / 1000]);
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
		<ModalSelector
			cancelText={languages["Cancel"][language].toLowerCase()}
			data={trackFreq}
			initValue={currTrack.toString() + " s"}
			initValueTextStyle={Styles.initValueTextStyle}
			onChange={async (option: { label: number }) => {
				await dispatch(changeTrackingFrequency(option.label));
			}}
		/>
	);
};

/**
 * Renders the selector for changing the sending frequency
 * @returns {JSX.Element}  A new SendingFrequency component
 */
export const SendingFrequency = (): JSX.Element => {
	const [language, dispatch] = [useTypedSelector((state) => state.language), useTypedDispatch()];
	const [currSend] = useTypedSelector((state) => [state.user.sendingFrequency / 1000]);

	let index = 0;
	const sendFreq = [
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
		{
			component: <Text>5 {languages["minutes"][language]}</Text>,
			key: index++,
			label: 300000,
		},
		{
			component: <Text>10 {languages["minutes"][language]}</Text>,
			key: index++,
			label: 600000,
		},
	];

	return (
		<ModalSelector
			cancelText={languages["Cancel"][language].toLowerCase()}
			data={sendFreq}
			initValue={currSend.toString() + " s"}
			initValueTextStyle={Styles.initValueTextStyle}
			onChange={async (option: { label: number }) => {
				await dispatch(changeSendingFrequency(option.label));
			}}
		/>
	);
};

export const RefreshingFrequency = (): JSX.Element => {
	const [language, dispatch] = [useTypedSelector((state) => state.language), useTypedDispatch()];
	const [refTrack] = useTypedSelector((state) => [state.user.refreshingFrequency / 1000]);
	let index = 0;
	const refreshFreq = [
		{
			component: <Text>1 {languages["second"][language]}</Text>,
			key: index++,
			label: 1000,
		},
		{
			component: <Text>10 {languages["second"][language]}</Text>,
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
		<ModalSelector
			cancelText={languages["Cancel"][language].toLowerCase()}
			data={refreshFreq}
			initValue={refTrack.toString() + " s"}
			initValueTextStyle={Styles.initValueTextStyle}
			onChange={async (option: { label: number }) => {
				await dispatch(changeRefreshingFrequency(option.label));
			}}
		/>
	);
};

export default { RefreshingFrequency, SendingFrequency, TrackingFrequency };
