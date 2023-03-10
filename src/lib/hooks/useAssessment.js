import _ from "lodash";
import { useRecords } from "./useRecords";

export const useAssessment = () => {
	const { recordsData } = useRecords();

	let assessmentData = _.map(_.uniqBy(recordsData, "assessment"), "assessment");
	assessmentData = assessmentData.filter((item) => _.trim(item) !== "");

	return { assessmentData };
};
