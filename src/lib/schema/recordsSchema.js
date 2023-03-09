import * as Yup from "yup";

export const recordsYupSchema = Yup.object().shape({
	dateofconsult: Yup.string(),
	subjective: Yup.string(),
	objective: Yup.string(),
	assessment: Yup.string().required("Assessment is required"),
	labs: Yup.string(),
	plan: Yup.string(),
	chiefcomplaint: Yup.string().required("Chief Complaint is required"),
	datedischarged: Yup.string(),
	disposition: Yup.string(),
	hmo: Yup.string(),
	bill: Yup.number(),
});

export const consultationSortHeader = [
	{
		label: "Date of Consult",
		value: "dateofconsult",
	},
	{
		label: "Date of Discharge",
		value: "dateofdischarge",
	},
	{
		label: "Chief Complaint",
		value: "chiefcomplaint",
	},
	{
		label: "Subjective",
		value: "subjective",
	},
	{
		label: "Objective",
		value: "objective",
	},
	{
		label: "Assessment",
		value: "assessment",
	},
	{
		label: "Plan",
		value: "plan",
	},

	{
		label: "Disposition",
		value: "disposition",
	},
];
