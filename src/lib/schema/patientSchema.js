import * as Yup from "yup";

export const patientYupSchema = Yup.object().shape({
	// datecreated: Yup.string().required(),
	firstname: Yup.string().required("First Name is required"),
	middlename: Yup.string().required("Middle Name is required"),
	lastname: Yup.string().required("Last Name is required"),
	birthday: Yup.string(),
	contactno: Yup.string(),
	address: Yup.string(),
	guardian: Yup.string(),
	relationship: Yup.string(),
	religion: Yup.string(),
	past_history: Yup.string(),
	current_condition: Yup.string(),
	allergies: Yup.string(),
});

export const patientSortHeader = [
	{
		label: "Date Created",
		value: "datecreated",
	},
	{
		label: "First Name",
		value: "firstname",
	},
	{
		label: "Middle Name",
		value: "middlename",
	},
	{
		label: "Last Name",
		value: "lastname",
	},
	{
		label: "Birthday",
		value: "birthday",
	},
	{
		label: "Contact No.",
		value: "contactno",
	},
	{
		label: "Address",
		value: "address",
	},
	{
		label: "Guardian",
		value: "guardian",
	},
	{
		label: "Relationship",
		value: "relationship",
	},
	{
		label: "Religion",
		value: "religion",
	},
	{
		label: "Past History",
		value: "past_history",
	},
	{
		label: "Current Condition",
		value: "current_condition",
	},
	{
		label: "Allergies",
		value: "allergies",
	},
];
