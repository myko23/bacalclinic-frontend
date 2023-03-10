import Button from "components/common/Button/Button";
import CheckBox from "components/common/CheckBox/CheckBox";
import DateBox from "components/common/DateBox/DateBox";
import FormGroup from "components/common/Forms/FormGroup/FormGroup";
import FormRow from "components/common/Forms/FormRow/FormRow";
import FormSection from "components/common/Forms/FormSection/FormSection";
import HMOModal from "components/features/HMOModal/HMOModal";
import InputBox from "components/common/InputBox/InputBox";
import TextAreaBox from "components/common/TextAreaBox/TextAreaBox";
import { getDateDiff } from "lib/utils/getDateDiff";
import { DateTime } from "luxon";
import React, { useEffect, useState } from "react";
import styles from "./AdmissionForm.module.scss";
import cls from "classnames";
import { checkArray } from "lib/utils/checkArray";
import AssessmentModal from "components/features/AssessmentModal/AssessmentModal";

const AdmissionForm = ({ formik, dischargeBox, editAdmissionValues, editFormat = false }) => {
	const { dischargeCheck, setDischargeCheck } = dischargeBox;
	const [hmoModal, setHmoModal] = useState(false);
	const [duration, setDuration] = useState("0");
	const [assessmentModal, setAssessmentModal] = useState(false);

	useEffect(() => {
		setDuration(`${getDateDiff(formik.values.datedischarged, formik.values.dateofconsult, "days")} days`);
	}, [formik.values.datedischarged, formik.values.dateofconsult]);

	return (
		<>
			<div className={styles.container}>
				<FormGroup>
					<FormSection header="Admission Details">
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
									checkArray("dateofconsult", editAdmissionValues) && editFormat && styles.editedInput
								)}
							/>
							<CheckBox
								label="Discharge"
								active={dischargeCheck}
								setActive={setDischargeCheck}
								className={styles.dischargeCheckBox}
							/>
						</FormRow>
						{dischargeCheck && (
							<>
								<FormRow>
									<DateBox
										label="Date of Discharge"
										selected={
											formik.values.datedischarged === ""
												? DateTime.now().toJSDate()
												: DateTime.fromFormat(
														formik.values.datedischarged,
														"MM-dd-yyyy"
												  ).toJSDate()
										}
										onChange={(e) => {
											if (e !== null) {
												const newDate = DateTime.fromJSDate(e).toFormat("MM-dd-yyyy");
												formik.setFieldValue("datedischarged", newDate);
											}
										}}
										className={cls(
											checkArray("datedischarged", editAdmissionValues) &&
												editFormat &&
												styles.editedInput
										)}
									/>
									<InputBox label="Duration" disabled={true} value={duration} onChange={() => {}} />
								</FormRow>
								<FormRow>
									<InputBox
										label="Disposition"
										width="50%"
										value={formik.values.disposition}
										onChange={formik.handleChange}
										name="disposition"
										className={cls(
											checkArray("disposition", editAdmissionValues) &&
												editFormat &&
												styles.editedInput
										)}
									/>
								</FormRow>
							</>
						)}
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
									checkArray("chiefcomplaint", editAdmissionValues) &&
										editFormat &&
										styles.editedInput
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
									checkArray("assessment", editAdmissionValues) && editFormat && styles.editedInput
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
					</FormSection>
					<FormSection header="Billing Details" border={false}>
						<FormRow>
							<InputBox
								label="HMO"
								value={formik.values.hmo}
								onChange={formik.handleChange}
								name="hmo"
								className={cls(
									checkArray("hmo", editAdmissionValues) && editFormat && styles.editedInput
								)}
							/>
							<Button
								label="HMO"
								className={styles.hmoBtn}
								onClick={() => {
									setHmoModal(true);
								}}
							/>
							<InputBox
								label="Bill"
								type="number"
								value={formik.values.bill}
								onChange={formik.handleChange}
								name="bill"
								className={cls(
									checkArray("bill", editAdmissionValues) && editFormat && styles.editedInput
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

export default AdmissionForm;
