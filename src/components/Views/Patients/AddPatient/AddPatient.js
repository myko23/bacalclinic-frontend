import BottomMenu from "components/common/BottomMenu/BottomMenu";
import Button from "components/common/Button/Button";
import React, { useState } from "react";
import PatientForm from "../PatientForm/PatientForm";
import styles from "./AddPatient.module.scss";
import cls from "classnames";
import { useFormik } from "formik";
import { DateTime } from "luxon";
import { patientYupSchema } from "lib/schema/patientSchema";
import ConfirmModal from "components/common/ConfirmModal/ConfirmModal";
import { toast } from "react-toastify";
import { useAddPatientMutation } from "lib/api/patientsAPI";
import { useRoute } from "lib/hooks/useRoute";
import _ from "lodash";
import Header from "components/common/Header/Header";
import { faUser } from "@fortawesome/free-solid-svg-icons";

const AddPatient = () => {
	const [confirmAdd, setConfirmAdd] = useState(false);
	const { setRecordsView } = useRoute();
	const addPatient = useAddPatientMutation();

	const formik = useFormik({
		enableReinitialize: true,
		initialValues: {
			firstname: "",
			middlename: "",
			lastname: "",
			birthday: DateTime.now().toFormat("MM-dd-yyyy"),
			contactno: "",
			address: "",
			guardian: "",
			relationship: "",
			religion: "",
			past_history: "",
			current_condition: "",
			allergies: "",
		},
		validateOnChange: false,
		validateOnBlur: false,
		validationSchema: patientYupSchema,
		onSubmit: (values) => {
			setConfirmAdd(true);
		},
	});

	return (
		<>
			<div className={styles.container}>
				<div className={styles.headerContainer}>
					<Header icon={faUser}>Add New Patient</Header>
				</div>
				<div className={styles.formContainer}>
					<PatientForm formik={formik} />
				</div>
			</div>
			<BottomMenu className={styles.bottomContainer}>
				{!_.isEmpty(formik.errors) && <h1 className={styles.errorMessage}>Please Fill Required Fields</h1>}
				<Button
					label="Save Details"
					className={cls(styles.saveDetailsBtn, styles.button)}
					onClick={formik.handleSubmit}
					type="submit"
				/>
				<Button label="Reset" className={cls(styles.resetBtn, styles.button)} onClick={formik.handleReset} />
				<Button label="Back" className={styles.button} onClick={() => setRecordsView("patientlist")} />
			</BottomMenu>
			<ConfirmModal
				enabled={confirmAdd}
				message={`Are you sure you want to ADD ${formik.values.firstname} ${formik.values.lastname} to the patient records`}
				onConfirm={async () => {
					try {
						await toast.promise(addPatient.mutateAsync(formik.values), {
							pending: "Adding Patient",
							success: "Patient Added",
							error: "Unsuccesful Adding",
						});

						setRecordsView("patientlist");
						setConfirmAdd(false);
					} catch (err) {
						console.error(err.response.data);
					}
				}}
				onCancel={() => {
					setConfirmAdd(false);
				}}
			/>
		</>
	);
};

export default AddPatient;
