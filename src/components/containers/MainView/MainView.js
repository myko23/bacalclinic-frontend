import NavBar from "components/features/NavBar/NavBar";
import { useRoute } from "lib/hooks/useRoute";
import React from "react";
import Billings from "../Billings/Billings";
import GeneralAdmissionView from "../GeneralAdmission/GeneralAdmissionView/GeneralAdmissionView";
import GeneralAdmitted from "../GeneralAdmitted/GeneralAdmitted";
import GeneralConsultationView from "../GeneralConsultation/GeneralConsultationView/GeneralConsultationView";
import Records from "../Records/Records";
import styles from "./MainView.module.scss";

const MainView = () => {
	const { mainview } = useRoute();

	const renderMainView = () => {
		switch (mainview) {
			case "records":
				return <Records />;
			case "generalconsultation":
				return <GeneralConsultationView />;
			case "generaladmission":
				return <GeneralAdmissionView />;
			case "generaladmitted":
				return <GeneralAdmitted />;
			case "billings":
				return <Billings />;
			default:
				return <Records />;
		}
	};

	return (
		<div className={styles.container}>
			<NavBar />
			{renderMainView()}
		</div>
	);
};

export default MainView;
