import _ from "lodash";
import { useRecords } from "./useRecords";

export const useHMO = () => {
	const { recordsData } = useRecords();

	let hmoData = _.map(_.uniqBy(recordsData, "hmo"), "hmo");
	hmoData = hmoData.filter((item) => _.trim(item) !== "");

	return { hmoData };
};
