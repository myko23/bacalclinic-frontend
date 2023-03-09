export const getDiffObj = (Obj1, Obj2) => {
	const diffObj = Object.keys(Obj1).filter((obj) => {
		if (Obj1[obj] === Obj2[obj]) return null;
		return obj;
	});

	return diffObj;
};
