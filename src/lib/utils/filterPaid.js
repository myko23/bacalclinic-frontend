export const filterPaid = (data, paid) => {
	if (paid === "all") return data;
	if (paid === "paid") return data.filter((item) => item.paid === true);
	return data.filter((item) => item.paid === false);
};
