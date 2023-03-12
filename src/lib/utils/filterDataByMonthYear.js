import { DateTime } from "luxon";

export const filterDataByMonthYear = (data, month, year) => {
	if (parseInt(month) !== 0) {
		const filterData = data.filter((item) => {
			const itemMonth = DateTime.fromFormat(item.dateofconsult, "MM-dd-yyyy").month;
			const itemYear = DateTime.fromFormat(item.dateofconsult, "MM-dd-yyyy").year;

			if (parseInt(month) === itemMonth && parseInt(year) === itemYear) return item;
			else return null;
		});
		return filterData;
	}

	const filterData = data.filter((item) => {
		const itemYear = DateTime.fromFormat(item.dateofconsult, "MM-dd-yyyy").year;

		if (parseInt(year) === itemYear) return item;
		else return null;
	});
	return filterData;
};
