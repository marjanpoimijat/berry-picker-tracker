/**
 * Formats a latitude coordinate as a string.
 *
 * @param {number} latitude - The latitude coordinate to format.
 * @returns {string} The formatted latitude string with a direction indicator.
 */
export const parseLatitude = (latitude: number): string => {
	return latitude > 0
		? `${formatCoordinate(latitude)} °N`
		: `${formatCoordinate(latitude)} °S`;
};

/**
 * Formats a longitude coordinate as a string.
 *
 * @param {number} longitude - The longitude coordinate to format.
 * @returns {string} The formatted longitude string with a direction indicator.
 */
export const parseLongitude = (longitude: number): string => {
	return longitude > 0
		? `${formatCoordinate(longitude)} °E`
		: `${formatCoordinate(longitude)} °W`;
};

/**
 * Formats a coordinate value as a string with 5 decimal places as an absolute value.
 *
 * @param {number} coordinate - The coordinate value to format.
 * @returns {string} The formatted coordinate string with 5 decimal places.
 */
const formatCoordinate = (coordinate: number): string => {
	return Math.abs(coordinate).toFixed(5);
};
