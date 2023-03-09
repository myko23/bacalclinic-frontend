import _ from "lodash";

export const useTableConfigs = (data, configs, sortConfig) => {
	//Headers
	let tableHeaders = configs?.map((config) => config.header);
	tableHeaders = ["_id", ...tableHeaders];

	//Sort
	const { defaultItem, sortItem, sortOrder } = sortConfig;

	const dataHeader = Object.keys(data ?? {});
	let newSortItem = sortItem;

	if (_.find(dataHeader, (head) => head === sortItem)) newSortItem = defaultItem;

	const sortedData = _.orderBy(data, [newSortItem], [sortOrder]);

	//Content
	const tableData = sortedData?.map((item) => {
		let newObj = {};

		configs.forEach((config) => {
			newObj = { ...newObj, [config.header]: config.content(item) ?? "Wrong Content" };
		});

		newObj = { _id: item._id, ...newObj };

		return newObj;
	});

	//Width
	let widthConfigs = configs?.map((config) => config.width);

	const totalSum = widthConfigs.reduce((sum, value) => {
		return sum + value;
	}, 0);

	const tableWidth = widthConfigs.map((config) => {
		return (config / totalSum) * 100;
	});

	return { tableData, tableHeaders, tableWidth };
};
