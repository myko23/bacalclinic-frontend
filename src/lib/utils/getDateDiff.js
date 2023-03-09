import { DateTime } from "luxon";

export const getDateDiff = (startDate, endDate, duration = "years") => {
	let startDateFormat;
	if (startDate !== "now") startDateFormat = DateTime.fromFormat(startDate, "MM-dd-yyyy");
	else startDateFormat = DateTime.now();

	const endDateFormat = DateTime.fromFormat(endDate, "MM-dd-yyyy");

	return parseInt(startDateFormat.diff(endDateFormat, duration).toObject()[duration]);
};
