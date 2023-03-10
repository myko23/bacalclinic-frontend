import {
	getSelectedState,
	setStateAdmissionID,
	setStateConsultationID,
	setStatePatientID,
} from "lib/store/reducers/selectedReducer";
import _ from "lodash";
import { useDispatch, useSelector } from "react-redux";
import { useRecords } from "./useRecords";

export const useSelected = () => {
	const { patientID, consultationID, admissionID } = useSelector(getSelectedState);
	const { consultationData, admissionData, patientData } = useRecords();
	const dispatch = useDispatch();

	const selectedPatient = _.find(patientData, (patient) => patient._id === patientID);
	const selectedConsultation = _.find(consultationData, (record) => record._id === consultationID);
	const selectedAdmission = _.find(admissionData, (record) => record._id === admissionID);
	const patientConsultationData = _.filter(consultationData, (record) => record.patient_id === selectedPatient?._id);
	const patientAdmissionData = _.filter(admissionData, (record) => record.patient_id === selectedPatient?._id);

	const setSelectedPatient = (id) => {
		setStatePatientID(dispatch)(id);
	};

	const setSelectedConsultation = (id) => {
		setStateConsultationID(dispatch)(id);
	};
	const setSelectedAdmission = (id) => {
		setStateAdmissionID(dispatch)(id);
	};

	return {
		selectedPatient,
		selectedConsultation,
		selectedAdmission,
		patientConsultationData,
		patientAdmissionData,
		setSelectedPatient,
		setSelectedConsultation,
		setSelectedAdmission,
	};
};
