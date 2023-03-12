import { useRoute } from "lib/hooks/useRoute";
import React from "react";
import GeneralAdmissionDay from "../GeneralAdmissionDay/GeneralAdmissionDay";
import GeneralAdmissionMonth from "../GeneralAdmissionMonth/GeneralAdmissionMonth";
import styles from "./GeneralAdmissionView.module.scss";

const GeneralAdmissionView = () => {
	const { generaladmissionview } = useRoute();

	const renderGeneralAdmissions = () => {
		switch (generaladmissionview) {
			case "days":
				return <GeneralAdmissionDay />;
			case "months":
				return <GeneralAdmissionMonth />;
			default:
				return <GeneralAdmissionDay />;
		}
	};
	return <div className={styles.container}>{renderGeneralAdmissions()}</div>;
};

export default GeneralAdmissionView;
