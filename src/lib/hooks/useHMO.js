import _ from "lodash";
import { useRecords } from "./useRecords";

export const useHMO = () => {
	const { recordsData } = useRecords();

	const hmoData = _.map(_.uniqBy(recordsData, "hmo"), "hmo");

	const sortHMOFeatures = hmoData.map((item) => {
		return { label: item, value: item };
	});

	const filterHMOData = (givenData) => {
		const sortedHmoData = _.uniq(hmoData).map((foo) => {
			const data = givenData.filter((bar) => foo === bar.hmo);

			const total = data.reduce((sum, value) => sum + parseInt(value.bill), 0);

			return { hmo: foo, data: data, total };
		});

		const existingHMOData = sortedHmoData.filter((data) => data.data.length !== 0);
		return existingHMOData;
	};

	return { hmoData, sortHMOFeatures, filterHMOData };
};
