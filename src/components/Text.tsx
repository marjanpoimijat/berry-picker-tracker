import { Text as NativeText, StyleSheet } from "react-native";

import theme from "../theme";

const styles = StyleSheet.create({
	text: {
		color: theme.colors.textPrimary,
		fontSize: theme.fontSizes.body,
		fontFamily: theme.fonts.main,
		fontWeight: theme.fontWeights.normal,
	},
	colorTextSecondary: {
		color: theme.colors.textSecondary,
	},
	colorPrimary: {
		color: theme.colors.primary,
	},
	fontSizeHeader: {
		fontSize: theme.fontSizes.header,
	},
	fontWeightBold: {
		fontWeight: theme.fontWeights.bold,
	},
});

interface Props {
	color: string;
	fontSize: string;
	fontWeight: string;
}

const Text = ({
	color,
	fontSize,
	fontWeight,
	...props
}: Props): JSX.Element => {
	const textStyle = [
		styles.text,
		color === "textSecondary" && styles.colorTextSecondary,
		color === "primary" && styles.colorPrimary,
		fontSize === "header" && styles.fontSizeHeader,
		fontWeight === "bold" && styles.fontWeightBold,
	];

	return <NativeText style={textStyle} {...props} />;
};

export default Text;
