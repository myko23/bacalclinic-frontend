import NavBar from "components/features/NavBar/NavBar";
import { useRoute } from "lib/hooks/useRoute";
import React from "react";
import GeneralAdmitted from "../GeneralAdmitted/GeneralAdmitted";
import GeneralConsultation from "../GeneralConsultation/GeneralConsultation";
import Records from "../Records/Records";
import styles from "./MainView.module.scss";

const MainView = () => {
	const { mainview } = useRoute();

	const renderMainView = () => {
		switch (mainview) {
			case "records":
				return <Records />;
			case "generalconsultation":
				return <GeneralConsultation />;
			case "generaladmitted":
				return <GeneralAdmitted />;
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
