import moment from "moment";
/**
 * Converts time from Unix timestamp to a readable timestamp
 *
 * @param {number} dateString - The time as a Unix timestamp in milliseconds
 * @returns {string} the time in YYYY-MM-DD HH:mm:ss format
 */
export const formatDate = (dateString: number): string => {
	const date = new Date(dateString);
	const formattedDate = moment.utc(date).format("YYYY-MM-DD HH:mm:ss");
	return formattedDate;
};
