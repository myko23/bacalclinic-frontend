import DateBox from "components/common/DateBox/DateBox";
import FormGroup from "components/common/Forms/FormGroup/FormGroup";
import FormRow from "components/common/Forms/FormRow/FormRow";
import FormSection from "components/common/Forms/FormSection/FormSection";
import InputBox from "components/common/InputBox/InputBox";
import { getDateDiff } from "lib/utils/getDateDiff";
import { DateTime } from "luxon";
import React, { useEffect, useState } from "react";
import styles from "./PatientForm.module.scss";
import cls from "classnames";
import { checkArray } from "lib/utils/checkArray";

const PatientForm = ({ formik, editPatientValues, editFormat = false }) => {
	const [age, setAge] = useState("");

	useEffect(() => {
		setAge(getDateDiff("now", formik.values.birthday) || "0");
	}, [formik.values.birthday]);

	return (
		<div className={styles.container}>
			<FormGroup>
				<FormSection header="Personal Details">
					<FormRow>
						<InputBox
							label="First Name"
							width="100%"
							className={cls(
								checkArray("firstname", editPatientValues) && editFormat && styles.editedInput
							)}
							value={formik.values.firstname}
							onChange={formik.handleChange}
							name="firstname"
							formikError={formik.errors.firstname}
						/>
						<InputBox
							label="Middle Name"
							width="100%"
							className={cls(
								checkArray("middlename", editPatientValues) && editFormat && styles.editedInput
							)}
							value={formik.values.middlename}
							onChange={formik.handleChange}
							name="middlename"
							formikError={formik.errors.middlename}
						/>
						<InputBox
							label="Last Name"
							width="100%"
							className={cls(
								checkArray("lastname", editPatientValues) && editFormat && styles.editedInput
							)}
							value={formik.values.lastname}
							onChange={formik.handleChange}
							name="lastname"
							formikError={formik.errors.lastname}
						/>
					</FormRow>
					<FormRow>
						<DateBox
							label="Birthday"
							className={cls(
								checkArray("birthday", editPatientValues) && editFormat && styles.editedInput
							)}
							selected={DateTime.fromFormat(formik.values.birthday, "MM-dd-yyyy").toJSDate()}
							onChange={(e) => {
								const newDate = DateTime.fromJSDate(e).toFormat("MM-dd-yyyy");
								formik.setFieldValue("birthday", newDate);
							}}
							formikError={formik.errors.birthday}
						/>
						<InputBox
							label="Age"
							value={age}
							onChange={(e) => setAge(e.target.value)}
							width="5rem"
							disabled={true}
						/>
						<InputBox
							label="Religion"
							className={cls(
								checkArray("religion", editPatientValues) && editFormat && styles.editedInput
							)}
							value={formik.values.religion}
							onChange={formik.handleChange}
							name="religion"
							formikError={formik.errors.religion}
						/>
					</FormRow>
					<FormRow>
						<InputBox
							label="Address"
							className={cls(
								checkArray("address", editPatientValues) && editFormat && styles.editedInput
							)}
							value={formik.values.address}
							onChange={formik.handleChange}
							name="address"
							formikError={formik.errors.address}
							width="100%"
						/>
					</FormRow>
					<FormRow>
						<InputBox
							label="Guardian"
							className={cls(
								checkArray("guardian", editPatientValues) && editFormat && styles.editedInput
							)}
							value={formik.values.guardian}
							onChange={formik.handleChange}
							name="guardian"
							formikError={formik.errors.guardian}
						/>
						<InputBox
							label="Contact No."
							className={cls(
								checkArray("contactno", editPatientValues) && editFormat && styles.editedInput
							)}
							value={formik.values.contactno}
							onChange={formik.handleChange}
							name="contactno"
							formikError={formik.errors.contactno}
						/>
						<InputBox
							label="Relationship"
							className={cls(
								checkArray("relationship", editPatientValues) && editFormat && styles.editedInput
							)}
							value={formik.values.relationship}
							onChange={formik.handleChange}
							name="relationship"
							formikError={formik.errors.relationship}
						/>
					</FormRow>
				</FormSection>
				<FormSection header="Medical History" border={false}>
					<FormRow>
						<InputBox
							label="Past History"
							className={cls(
								checkArray("past_history", editPatientValues) && editFormat && styles.editedInput
							)}
							width="100%"
							value={formik.values.past_history}
							onChange={formik.handleChange}
							name="past_history"
							formikError={formik.errors.past_history}
						/>
					</FormRow>
					<FormRow>
						<InputBox
							label="Current Condition"
							className={cls(
								checkArray("current_condition", editPatientValues) && editFormat && styles.editedInput
							)}
							width="100%"
							value={formik.values.current_condition}
							onChange={formik.handleChange}
							name="current_condition"
							formikError={formik.errors.current_condition}
						/>
					</FormRow>
					<FormRow>
						<InputBox
							label="Allergies"
							className={cls(
								checkArray("allergies", editPatientValues) && editFormat && styles.editedInput
							)}
							width="100%"
							value={formik.values.allergies}
							onChange={formik.handleChange}
							name="allergies"
							formikError={formik.errors.allergies}
						/>
					</FormRow>
				</FormSection>
			</FormGroup>
		</div>
	);
};

export default PatientForm;
