import DateBox from "components/common/DateBox/DateBox";
import FormGroup from "components/common/Forms/FormGroup/FormGroup";
import FormRow from "components/common/Forms/FormRow/FormRow";
import FormSection from "components/common/Forms/FormSection/FormSection";
import InputBox from "components/common/InputBox/InputBox";
import TextAreaBox from "components/common/TextAreaBox/TextAreaBox";
import { useSelected } from "lib/hooks/useSelected";
import { getDateDiff } from "lib/utils/getDateDiff";
import { DateTime } from "luxon";
import React, { useEffect, useState } from "react";
import styles from "./ConsultationForm.module.scss";
import cls from "classnames";
import { checkArray } from "lib/utils/checkArray";
import Button from "components/common/Button/Button";
import HMOModal from "components/features/HMOModal/HMOModal";
import AssessmentModal from "components/features/AssessmentModal/AssessmentModal";

const ConsultationForm = ({ formik, editConsultationValues, editFormat = false }) => {
	const [age, setAge] = useState("");
	const { selectedPatient } = useSelected();
	const [hmoModal, setHmoModal] = useState(false);
	const [assessmentModal, setAssessmentModal] = useState(false);

	useEffect(() => {
		setAge(getDateDiff(formik.values.dateofconsult, selectedPatient.birthday) || "0");
	}, [formik.values.dateofconsult, selectedPatient]);

	return (
		<>
			<div className={styles.container}>
				<FormGroup>
					<FormSection header="Consultation Details">
						<FormRow>
							<DateBox
								label="Date of Consult"
								selected={DateTime.fromFormat(formik.values.dateofconsult, "MM-dd-yyyy").toJSDate()}
								onChange={(e) => {
									if (e !== null) {
										const newDate = DateTime.fromJSDate(e).toFormat("MM-dd-yyyy");
										formik.setFieldValue("dateofconsult", newDate);
									}
								}}
								className={cls(
									checkArray("dateofconsult", editConsultationValues) &&
										editFormat &&
										styles.editedInput
								)}
							/>
							<InputBox label="Age" width="5rem" disabled={true} value={age} />
						</FormRow>
					</FormSection>
					<FormSection header="Medical Details">
						<FormRow>
							<TextAreaBox
								label="Chief Complaint"
								width="100%"
								value={formik.values.chiefcomplaint}
								onChange={formik.handleChange}
								name="chiefcomplaint"
								formikError={formik.errors.chiefcomplaint}
								className={cls(
									checkArray("chiefcomplaint", editConsultationValues) &&
										editFormat &&
										styles.editedInput
								)}
							/>
						</FormRow>
						<FormRow>
							<TextAreaBox
								label="Subjective"
								width="100%"
								value={formik.values.subjective}
								onChange={formik.handleChange}
								name="subjective"
								formikError={formik.errors.subjective}
								className={cls(
									checkArray("subjective", editConsultationValues) && editFormat && styles.editedInput
								)}
							/>
						</FormRow>
						<FormRow>
							<TextAreaBox
								label="Objective"
								width="100%"
								value={formik.values.objective}
								onChange={formik.handleChange}
								name="objective"
								formikError={formik.errors.objective}
								className={cls(
									checkArray("objective", editConsultationValues) && editFormat && styles.editedInput
								)}
							/>
						</FormRow>
						<FormRow>
							<TextAreaBox
								label="Assessment"
								width="100%"
								value={formik.values.assessment}
								onChange={formik.handleChange}
								name="assessment"
								formikError={formik.errors.assessment}
								className={cls(
									checkArray("assessment", editConsultationValues) && editFormat && styles.editedInput
								)}
							/>
						</FormRow>
						<FormRow>
							<Button
								label="Assessment"
								className={styles.assessmentBtn}
								onClick={() => {
									setAssessmentModal(true);
								}}
							/>
						</FormRow>
						<FormRow>
							<TextAreaBox
								label="Plan"
								width="100%"
								value={formik.values.plan}
								onChange={formik.handleChange}
								name="plan"
								formikError={formik.errors.plan}
								className={cls(
									checkArray("plan", editConsultationValues) && editFormat && styles.editedInput
								)}
							/>
						</FormRow>
					</FormSection>
					<FormSection header="Billing Details" border={false}>
						<FormRow>
							<InputBox
								label="HMO"
								value={formik.values.hmo}
								onChange={formik.handleChange}
								name="hmo"
								formikError={formik.errors.hmo}
								className={cls(
									checkArray("hmo", editConsultationValues) && editFormat && styles.editedInput
								)}
							/>
							<Button label="HMO" className={styles.hmoBtn} onClick={() => setHmoModal(true)} />
							<InputBox
								label="Bill"
								type="number"
								value={formik.values.bill}
								onChange={formik.handleChange}
								name="bill"
								formikError={formik.errors.bill}
								className={cls(
									checkArray("bill", editConsultationValues) && editFormat && styles.editedInput
								)}
							/>
						</FormRow>
					</FormSection>
				</FormGroup>
			</div>
			<HMOModal
				enabled={hmoModal}
				formik={formik}
				onCancel={() => {
					setHmoModal(false);
				}}
			/>
			<AssessmentModal enabled={assessmentModal} onCancel={() => setAssessmentModal(false)} formik={formik} />
		</>
	);
};

export default ConsultationForm;
