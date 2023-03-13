import moment from "moment";

export const formatDate = (dateString: number): string => {
	const date = new Date(dateString);
	const formattedDate = moment(date).format("YYYY-MM-DD HH:mm:ss");
	return formattedDate;
};
