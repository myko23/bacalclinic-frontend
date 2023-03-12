import _ from "lodash";
import { useFetchQuery } from "./useFetchQuery";

export const useRecords = () => {
	const recordsData = useFetchQuery(["records"]);
	const patientData = useFetchQuery(["patients"]);

	const consultationData = _.filter(recordsData, (record) => record.type === "consultation");
	const admissionData = _.filter(recordsData, (record) => record.type === "admission");

	const nameConsultationData = _.map(consultationData, (consult) => {
		const newPatient = _.find(patientData, (foo) => foo._id === consult.patient_id);
		const { firstname, lastname, middlename } = newPatient;
		return { ...consult, firstname, lastname, middlename };
	});
	const nameAdmissionData = _.map(admissionData, (consult) => {
		const newPatient = _.find(patientData, (foo) => foo._id === consult.patient_id);
		const { firstname, lastname, middlename } = newPatient;
		return { ...consult, firstname, lastname, middlename };
	});
	const nameRecordsData = _.map(recordsData, (consult) => {
		const newPatient = _.find(patientData, (foo) => foo._id === consult.patient_id);
		const { firstname, lastname, middlename } = newPatient;
		return { ...consult, firstname, lastname, middlename };
	});

	const admittedAdmissionData = nameAdmissionData.filter((item) => item?.datedischarged === "");

	return {
		consultationData,
		admissionData,
		patientData,
		recordsData,
		nameRecordsData,
		nameConsultationData,
		nameAdmissionData,
		admittedAdmissionData,
	};
};
