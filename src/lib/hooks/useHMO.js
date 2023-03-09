import _ from "lodash";
import { useRecords } from "./useRecords";

export const useHMO = () => {
	const { consultationData } = useRecords();

	let hmoData = _.map(_.uniqBy(consultationData, "hmo"), "hmo");
	hmoData = hmoData.filter((item) => _.trim(item) !== "");

	return { hmoData };
};
