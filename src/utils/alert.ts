import { Alert } from "react-native";
import { languages } from "../languages";
import { store } from "../store";
import { AlertObject } from "../types";

/**
 * Creates a new alert. An alert is used to notify the user of something or
 * to ask them to confirm an action.
 *
 * An alert consists of a title, an info text and buttons.
 * The "Cancel" button is optional but a confirm button text should always
 * be provided.
 *
 * Provide the parameters as an object.
 *
 * @param {boolean} cancellable If true, a "Cancel" button will be displayed.
 * @param {string} confirmText The text to be displayed in the confirm button.
 * @param {string} infoText Provides details about the alert.
 * @param {function} onPress The function to be run after confirming the action.
 * @param {string} title Informs the user what the alert is about.
 * @returns {void}
 */
export const createAlert = ({ cancellable, confirmText, infoText, onPress, title }: AlertObject): void => {
	const language = store.getState().language;
	const buttons = [
		{
			onPress,
			text: confirmText,
		},
	];
	if (cancellable) {
		buttons.unshift({
			onPress: () => {},
			text: languages["Cancel"][language],
		});
	}
	Alert.alert(title, infoText, buttons);
};
