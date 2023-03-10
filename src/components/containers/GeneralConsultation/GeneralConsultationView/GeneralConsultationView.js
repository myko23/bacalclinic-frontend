import { useRoute } from "lib/hooks/useRoute";
import React from "react";
import styles from "./GeneralConsultationView.module.scss";
import GeneralConsultationDay from "components/containers/GeneralConsultation/GeneralConsultationDay/GeneralConsultationDay";
import GeneralConsultationMonth from "../GeneralConsultationMonth/GeneralConsultationMonth";

const GeneralConsultationView = () => {
	const { generalconsultationview } = useRoute();

	const renderGeneralConsultation = () => {
		switch (generalconsultationview) {
			case "days":
				return <GeneralConsultationDay />;
			case "months":
				return <GeneralConsultationMonth />;
			default:
				return <GeneralConsultationDay />;
		}
	};
	return <div className={styles.container}>{renderGeneralConsultation()}</div>;
};

export default GeneralConsultationView;
