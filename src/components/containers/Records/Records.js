import AddAdmission from "components/Views/Admissions/AddAdmission/AddAdmission";
import AdmissionList from "components/Views/Admissions/AdmissionList/AdmissionList";
import EditAdmission from "components/Views/Admissions/EditAdmission/EditAdmission";
import AddConsultation from "components/Views/Consultations/AddConsultation/AddConsultation";
import ConsultationList from "components/Views/Consultations/ConsultationList/ConsultationList";
import EditConsultation from "components/Views/Consultations/EditConsultation/EditConsultation";
import AddPatient from "components/Views/Patients/AddPatient/AddPatient";
import EditPatient from "components/Views/Patients/EditPatient/EditPatient";
import PatientList from "components/Views/Patients/PatientList/PatientList";
import { useRoute } from "lib/hooks/useRoute";
import React from "react";
import styles from "./Records.module.scss";

const Records = () => {
	const { recordsview } = useRoute();

	const renderRecordsView = () => {
		switch (recordsview) {
			case "patientlist":
				return <PatientList />;
			case "addpatient":
				return <AddPatient />;
			case "editpatient":
				return <EditPatient />;
			case "consultationlist":
				return <ConsultationList />;
			case "addconsultation":
				return <AddConsultation />;
			case "editconsultation":
				return <EditConsultation />;
			case "admissionlist":
				return <AdmissionList />;
			case "addadmission":
				return <AddAdmission />;
			case "editadmission":
				return <EditAdmission />;
			default:
				return <PatientList />;
		}
	};

	return <div className={styles.container}>{renderRecordsView()}</div>;
};

export default Records;
