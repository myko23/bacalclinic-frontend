import _ from "lodash";
import { useRecords } from "./useRecords";

export const useAssessment = () => {
	const { recordsData } = useRecords();
	let newAssessmentData = [];

	let assessmentData = _.map(_.uniqBy(recordsData, "assessment"), "assessment");

	assessmentData.forEach((data) => {
		const newData = data.split(",");
		newData.forEach((item) => {
			newAssessmentData.push(item.trim());
		});
	});

	newAssessmentData = newAssessmentData.filter((item) => _.trim(item) !== "");
	return { assessmentData: newAssessmentData };
};
