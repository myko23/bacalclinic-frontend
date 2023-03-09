import React, { useState } from "react";
import styles from "./AddConsultation.module.scss";
import { useSelected } from "lib/hooks/useSelected";
import ConsultationForm from "../ConsultationForm/ConsultationForm";
import { useFormik } from "formik";
import { DateTime } from "luxon";
import BottomMenu from "components/common/BottomMenu/BottomMenu";
import _ from "lodash";
import Button from "components/common/Button/Button";
import cls from "classnames";
import { recordsYupSchema } from "lib/schema/recordsSchema";
import ConfirmModal from "components/common/ConfirmModal/ConfirmModal";
import { toast } from "react-toastify";
import { useRoute } from "lib/hooks/useRoute";
import { useAddRecordsMutation } from "lib/api/recordsAPI";

const AddConsultation = () => {
	const { selectedPatient } = useSelected();
	const [confirmAdd, setConfirmAdd] = useState(false);
	const { setRecordsView } = useRoute();
	const addRecords = useAddRecordsMutation();

	const formik = useFormik({
		enableReinitialize: true,
		initialValues: {
			dateofconsult: DateTime.now().toFormat("MM-dd-yyyy"),
			subjective: "",
			objective: "",
			labs: "",
			plan: "",
			chiefcomplaint: "",
			assessment: "",
			hmo: "",
			bill: "300",
		},
		validateOnBlur: false,
		validateOnChange: false,
		validationSchema: recordsYupSchema,
		onSubmit: async (values) => {
			setConfirmAdd(true);
		},
	});

	return (
		<>
			<div className={styles.container}>
				<div className={styles.headerContainer}>
					<h1 className={styles.header}>{`${selectedPatient.firstname} ${selectedPatient.lastname}`}</h1>
					<h2 className={styles.headerLabel}>Add Consultation</h2>
				</div>
				<div className={styles.formContainer}>
					<ConsultationForm formik={formik} />
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
				<Button label="Back" className={styles.button} onClick={() => setRecordsView("consultationlist")} />
			</BottomMenu>
			<ConfirmModal
				enabled={confirmAdd}
				message={`Are you sure you want to ADD a consult to the patient records`}
				onConfirm={async () => {
					try {
						await toast.promise(
							addRecords.mutateAsync({
								...formik.values,
								type: "consultation",
								patient_id: selectedPatient._id,
							}),
							{
								pending: "Adding Consultation",
								success: "Consultation Added",
								error: "Unsuccesful Adding",
							}
						);

						setRecordsView("consultationlist");
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

export default AddConsultation;
