import BottomMenu from "components/common/BottomMenu/BottomMenu";
import Button from "components/common/Button/Button";
import { useFormik } from "formik";
import { useSelected } from "lib/hooks/useSelected";
import { recordsYupSchema } from "lib/schema/recordsSchema";
import { getDiffObj } from "lib/utils/getDiffObj";
import _ from "lodash";
import React, { useState } from "react";
import ConsultationForm from "../ConsultationForm/ConsultationForm";
import styles from "./EditConsultation.module.scss";
import cls from "classnames";
import ConfirmModal from "components/common/ConfirmModal/ConfirmModal";
import { useEditRecordsMutation } from "lib/api/recordsAPI";
import { toast } from "react-toastify";
import { useRoute } from "lib/hooks/useRoute";

const EditConsultation = () => {
	const { selectedPatient, selectedConsultation } = useSelected();
	const { setRecordsView } = useRoute();
	const [confirmEdit, setConfirmEdit] = useState(false);
	const editConsultation = useEditRecordsMutation();

	const formik = useFormik({
		enableReinitialize: true,
		initialValues: {
			dateofconsult: selectedConsultation.dateofconsult,
			subjective: selectedConsultation.subjective,
			objective: selectedConsultation.objective,
			labs: selectedConsultation.labs,
			plan: selectedConsultation.plan,
			chiefcomplaint: selectedConsultation.chiefcomplaint,
			assessment: selectedConsultation.assessment,
			hmo: selectedConsultation.hmo,
			bill: selectedConsultation.bill,
		},
		validateOnBlur: false,
		validateOnChange: false,
		validationSchema: recordsYupSchema,
		onSubmit: async (values) => {
			setConfirmEdit(true);
		},
	});

	const editConsultationValues = getDiffObj(formik.values, selectedConsultation);
	return (
		<>
			<div className={styles.container}>
				<div className={styles.headerContainer}>
					<h1 className={styles.header}>{`${selectedPatient.firstname} ${selectedPatient.lastname}`}</h1>
				</div>
				<div className={styles.formContainer}>
					<ConsultationForm
						formik={formik}
						editConsultationValues={editConsultationValues}
						editFormat={true}
					/>
				</div>
			</div>
			<BottomMenu className={styles.bottomContainer}>
				{!_.isEmpty(formik.errors) && <h1 className={styles.errorMessage}>Please Fill Required Fields</h1>}
				<Button
					label="Edit"
					className={cls(styles.editBtn, styles.button)}
					onClick={formik.handleSubmit}
					disabled={editConsultationValues.length === 0 ? true : false}
					type="submit"
				/>
				<Button
					label="Reset"
					className={cls(styles.resetBtn, styles.button)}
					onClick={formik.handleReset}
					disabled={editConsultationValues.length === 0 ? true : false}
				/>
				<Button label="Back" className={styles.button} onClick={() => setRecordsView("consultationlist")} />
			</BottomMenu>
			<ConfirmModal
				enabled={confirmEdit}
				message={`Are you sure you want to EDIT consultation details`}
				onConfirm={async () => {
					try {
						await toast.promise(
							editConsultation.mutateAsync({ id: selectedConsultation._id, body: formik.values }),
							{
								pending: "Saving Consultation",
								success: "Consultation Edited",
								error: "Unsuccesful Editing",
							}
						);

						setConfirmEdit(false);
					} catch (err) {
						console.error(err.response.data);
					}
				}}
				onCancel={() => {
					setConfirmEdit(false);
				}}
			/>
		</>
	);
};

export default EditConsultation;
