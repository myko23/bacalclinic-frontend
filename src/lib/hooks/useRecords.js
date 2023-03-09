import _ from "lodash";
import { useFetchQuery } from "./useFetchQuery";

export const useRecords = () => {
	const recordsData = useFetchQuery(["records"]);

	const consultationData = _.filter(recordsData, (record) => record.type === "consultation");
	const admissionData = _.filter(recordsData, (record) => record.type === "admission");

	return { consultationData, admissionData };
};
