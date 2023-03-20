const getCircleColor = (color: string): string => {
	switch (color) {
		case "1g":
			return "rgba(254, 112, 238, 0.05)";
		case "2g":
			return "rgba(237, 143, 236, 0.05)";
		case "3g":
			return "rgba(235, 241, 63, 0.05)";
		case "4g":
			return "rgba(105, 219, 244, 0.05)";
		case "5g":
			return "rgba(137, 243, 120, 0.05)";
		default:
			return "rgba(228, 68, 68, 0.05)";
	}
};

export default getCircleColor;
