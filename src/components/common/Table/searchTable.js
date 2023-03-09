export const searchTable = (data, search) => {
	return data?.filter((item) => {
		let counter = false;
		Object.values(item).forEach((next, index) => {
			if (index !== 0 && next?.toString().toLowerCase().includes(search.toLowerCase())) {
				return (counter = true);
			}
		});
		if (counter === true) return item;
		else return null;
	});
};
