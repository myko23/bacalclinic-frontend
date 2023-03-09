import _ from "lodash";

export const checkArray = (field, editArray) => {
	return _.includes(editArray, field);
};
