import BottomMenu from "components/common/BottomMenu/BottomMenu";
import Button from "components/common/Button/Button";
import React, { useState } from "react";
import PatientForm from "../PatientForm/PatientForm";
import styles from "./EditPatient.module.scss";
import cls from "classnames";
import { useFormik } from "formik";
import { patientYupSchema } from "lib/schema/patientSchema";
import { useSelected } from "lib/hooks/useSelected";
import { getDiffObj } from "lib/utils/getDiffObj";
import { useEditPatientMutation } from "lib/api/patientsAPI";
import ConfirmModal from "components/common/ConfirmModal/ConfirmModal";
import { toast } from "react-toastify";
import _ from "lodash";
import { useRoute } from "lib/hooks/useRoute";

const EditPatient = () => {
	const { selectedPatient } = useSelected();
	const { setRecordsView } = useRoute();

	const editPatient = useEditPatientMutation();

	const [confirmDelete, setConfirmDelete] = useState(false);

	const formik = useFormik({
		enableReinitialize: true,
		initialValues: {
			firstname: selectedPatient.firstname,
			middlename: selectedPatient.middlename,
			lastname: selectedPatient.lastname,
			birthday: selectedPatient.birthday,
			contactno: selectedPatient.contactno,
			address: selectedPatient.address,
			guardian: selectedPatient.guardian,
			relationship: selectedPatient.relationship,
			religion: selectedPatient.religion,
			past_history: selectedPatient.past_history,
			current_condition: selectedPatient.current_condition,
			allergies: selectedPatient.allergies,
		},
		validateOnChange: false,
		validateOnBlur: false,
		validationSchema: patientYupSchema,
		onSubmit: (values) => {
			setConfirmDelete(true);
		},
	});

	const editPatientValues = getDiffObj(formik.values, selectedPatient);

	return (
		<>
			<div className={styles.container}>
				<div className={styles.headerContainer}>
					<h1 className={styles.header}>{`${selectedPatient.firstname} ${selectedPatient.lastname}`}</h1>
					<div className={styles.recordsContainer}>
						<div className={cls(styles.recordsItem, styles.recordsSelected)}>Records</div>
						<div className={styles.recordsItem} onClick={() => setRecordsView("consultationlist")}>
							Consultation
						</div>
						<div className={styles.recordsItem} onClick={() => setRecordsView("admissionlist")}>
							Admission
						</div>
					</div>
				</div>
				<div className={styles.formContainer}>
					<PatientForm formik={formik} editPatientValues={editPatientValues} editFormat={true} />
				</div>
			</div>
			<BottomMenu className={styles.bottomContainer}>
				{!_.isEmpty(formik.errors) && <h1 className={styles.errorMessage}>Please Fill Required Fields</h1>}
				<Button
					label="Edit"
					className={cls(styles.editBtn, styles.button)}
					onClick={formik.handleSubmit}
					disabled={editPatientValues.length === 0 ? true : false}
					type="submit"
				/>
				<Button
					label="Reset"
					className={cls(styles.resetBtn, styles.button)}
					onClick={formik.handleReset}
					disabled={editPatientValues.length === 0 ? true : false}
				/>
				<Button label="Back" className={styles.button} onClick={() => setRecordsView("patientlist")} />
			</BottomMenu>
			<ConfirmModal
				enabled={confirmDelete}
				message={`Are you sure you want to EDIT ${formik.values.firstname} ${formik.values.lastname} details`}
				onConfirm={async () => {
					try {
						await toast.promise(editPatient.mutateAsync({ id: selectedPatient._id, body: formik.values }), {
							pending: "Saving Patient",
							success: "Patient Edited",
							error: "Unsuccesful Editing",
						});

						setConfirmDelete(false);
					} catch (err) {
						console.error(err.response.data);
					}
				}}
				onCancel={() => {
					setConfirmDelete(false);
				}}
			/>
		</>
	);
};

export default EditPatient;
