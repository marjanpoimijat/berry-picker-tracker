/**
 * Returns a hex color code based on a user identifier.
 *
 * @param {number} id User identifier.
 * @returns {string} Hex color code.
 */
export const getColor = (id: number): string => {
	return colors[id % colors.length];
};

/**
 * Returns a lighter hex color code based on a user identifier.
 *
 * @param {number} id User identifier.
 * @returns {string} Hex color code.
 */
export const getLineColor = (id: number): string => {
	const hexColor = colors[id % colors.length];
	return getLightColor(hexColor);
};

const colors: string[] = [
	"#DC143C", // Crimson
	"#2ECC40", // Green
	"#FFDC00", // Yellow
	"#B10DC9", // Purple
	"#39CCCC", // Turquoise
	"#FF851B", // Orange
	"#85144b", // Maroon
	"#FF4136", // Red
	"#FF6F61", // Coral
	"#001f3f", // Navy
	"#FFC0CB", // Pink
	"#F012BE", // Magenta
	"#3D9970", // Olive
	"#FFD700", // Gold
	"#9B59B6", // Amethyst
	"#F7DC6F", // Khaki
	"#2C3E50", // Midnight blue
	"#0074D9", // Blue
	"#E74C3C", // Brick red
];

/**
 * Converts a given hex color code into a lighter version.
 *
 * @param {string} hexColor Original color code.
 * @returns {string} A hex color code.
 */
const getLightColor = (hexColor: string) => {
	const r = parseInt(hexColor.slice(1, 3), 16);
	const g = parseInt(hexColor.slice(3, 5), 16);
	const b = parseInt(hexColor.slice(5, 7), 16);

	const multiplier = 0.25;

	const rLighter = Math.floor((255 - r) * multiplier) + r;
	const gLighter = Math.floor((255 - g) * multiplier) + g;
	const bLighter = Math.floor((255 - b) * multiplier) + b;

	const hexLighter = `#${rLighter.toString(16)}${gLighter.toString(16)}${bLighter.toString(16)}`;

	return hexLighter;
};
