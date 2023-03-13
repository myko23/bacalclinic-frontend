import { useRecords } from "lib/hooks/useRecords";
import { useSelected } from "lib/hooks/useSelected";
import { getDateDiff } from "lib/utils/getDateDiff";
import _ from "lodash";
import { DateTime } from "luxon";

export const useTableSettings = () => {
	const { selectedPatient } = useSelected();
	const { patientData } = useRecords();

	const patientTableConfigs = [
		{
			header: "Last Name",
			content: (item) => {
				return item.lastname;
			},
			width: 20,
		},
		{
			header: "First Name",
			content: (item) => item.firstname,
			width: 40,
		},
		{
			header: "Birthday",
			content: (item) => {
				return DateTime.fromFormat(item.birthday, "MM-dd-yyyy").toFormat("MM/dd/yy");
			},
			width: 30,
		},
	];
	const consultationTableConfigs = [
		{
			header: "Date of Consultation",
			content: (item) => {
				return DateTime.fromFormat(item.dateofconsult, "MM-dd-yyyy").toFormat("MM/dd/yy");
			},
			width: 15,
		},
		{
			header: "Age",
			content: (item) => {
				return getDateDiff(item.dateofconsult, selectedPatient?.birthday);
			},
			width: 5,
		},
		{
			header: "Chief Complaint",
			content: (item) => {
				return item.chiefcomplaint;
			},
			width: 25,
		},
		{
			header: "Assessment",
			content: (item) => {
				return item.assessment || "NA";
			},
			width: 25,
		},
	];

	const admissionTableConfigs = [
		{
			header: "Date of Admission",
			content: (item) => {
				return DateTime.fromFormat(item.dateofconsult, "MM-dd-yyyy").toFormat("MM/dd/yy");
			},
			width: 15,
		},
		{
			header: "Date of Discharge",
			content: (item) => {
				return item?.datedischarged
					? DateTime.fromFormat(item.datedischarged, "MM-dd-yyyy").toFormat("MM/dd/yy")
					: "NA";
			},
			width: 15,
		},
		{
			header: "Assessment",
			content: (item) => item.assessment,
			width: 50,
		},
		{
			header: "Remarks",
			content: (item) => {
				return item?.disposition ? `${item.disposition}` : "NA";
			},
			width: 20,
		},
	];

	const generalConsultationTableConfigs = [
		{
			header: "Patient",
			content: (item) => {
				return `${item.firstname} ${item.lastname}`;
			},
			width: 30,
		},
		{
			header: "Age",
			content: (item) => {
				const patient = _.find(patientData, (patient) => item.patient_id === patient._id);
				return getDateDiff(item.dateofconsult, patient.birthday);
			},
			width: 20,
		},
		{
			header: "Chief Complaint",
			content: (item) => {
				return item.chiefcomplaint;
			},
			width: 25,
		},
		{
			header: "Assessment",
			content: (item) => {
				return item.assessment || "NA";
			},
			width: 25,
		},
	];

	const generalAdmissionTableConfigs = [
		{
			header: "Patient",
			content: (item) => {
				return `${item.firstname} ${item.lastname}`;
			},
			width: 20,
		},
		{
			header: "Admission",
			content: (item) => {
				return DateTime.fromFormat(item.dateofconsult, "MM-dd-yyyy").toFormat("MM/dd/yy");
			},
			width: 10,
		},
		{
			header: "Discharge",
			content: (item) => {
				return item.datedischarged
					? DateTime.fromFormat(item.datedischarged, "MM-dd-yyyy").toFormat("MM/dd/yy")
					: "NA";
			},
			width: 10,
		},

		{
			header: "Assessment",
			content: (item) => item.assessment,
			width: 25,
		},
		{
			header: "Remarks",
			content: (item) => {
				return item?.disposition ? `${item.disposition}` : "NA";
			},
			width: 15,
		},
	];

	const hmoTableConfigs = [
		{
			header: "Patient",
			content: (item) => {
				return `${item.firstname} ${item.lastname}`;
			},
			width: 40,
		},
		{
			header: "Type",
			content: (item) => {
				return _.capitalize(item.type);
			},
			width: 20,
		},
		{
			header: "Date",
			content: (item) => {
				return DateTime.fromFormat(item.dateofconsult, "MM-dd-yyyy").toFormat("MM/dd/yy");
			},
			width: 20,
		},
		{
			header: "Bill",
			content: (item) => {
				return item.bill;
			},
			width: 20,
		},
		{
			header: "Paid",
			content: (item) => {
				return item.paid ? "Paid" : "Unpaid";
			},
			width: 20,
		},
	];

	return {
		patientTableConfigs,
		consultationTableConfigs,
		admissionTableConfigs,
		generalConsultationTableConfigs,
		generalAdmissionTableConfigs,
		hmoTableConfigs,
	};
};
