export const filterRecordsByType = (data, type) => {
	if (type === "all") return data;

	return data.filter((item) => item.type === type);
};
