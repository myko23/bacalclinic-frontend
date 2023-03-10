import React, { useEffect, useState } from "react";
import styles from "./EditAdmission.module.scss";
import { useSelected } from "lib/hooks/useSelected";
import { useFormik } from "formik";
import AdmissionForm from "../AdmissionForm/AdmissionForm";
import _ from "lodash";
import BottomMenu from "components/common/BottomMenu/BottomMenu";
import Button from "components/common/Button/Button";
import { getDiffObj } from "lib/utils/getDiffObj";
import cls from "classnames";
import { useRoute } from "lib/hooks/useRoute";
import { DateTime } from "luxon";
import ConfirmModal from "components/common/ConfirmModal/ConfirmModal";
import { recordsYupSchema } from "lib/schema/recordsSchema";
import { useEditRecordsMutation } from "lib/api/recordsAPI";
import { toast } from "react-toastify";
import { faBedPulse } from "@fortawesome/free-solid-svg-icons";
import Header from "components/common/Header/Header";

const EditAdmission = () => {
	const { selectedPatient, selectedAdmission } = useSelected();
	const [dischargeCheck, setDischargeCheck] = useState(false);
	const [confirmEdit, setConfirmEdit] = useState(false);
	const { setRecordsView } = useRoute();
	const editRecords = useEditRecordsMutation();

	useEffect(() => {
		if (selectedAdmission.datedischarged !== "") setDischargeCheck(true);
	}, [selectedAdmission]);

	const formik = useFormik({
		enableReinitialize: true,
		initialValues: {
			dateofconsult: selectedAdmission.dateofconsult,
			datedischarged: selectedAdmission.datedischarged,
			disposition: selectedAdmission.disposition,
			chiefcomplaint: selectedAdmission.chiefcomplaint,
			assessment: selectedAdmission.assessment,
			hmo: selectedAdmission.hmo,
			bill: selectedAdmission.bill,
		},
		validateOnBlur: false,
		validateOnChange: false,
		validationSchema: recordsYupSchema,
		onSubmit: async (values) => {
			setConfirmEdit(true);
		},
	});

	useEffect(() => {
		if (!dischargeCheck) {
			formik.setFieldValue("datedischarged", "");
			formik.setFieldValue("disposition", "");
		} else {
			formik.setFieldValue(
				"datedischarged",
				selectedAdmission?.datedischarged || DateTime.now().toFormat("MM-dd-yyyy")
			);
			formik.setFieldValue("disposition", selectedAdmission?.disposition);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [dischargeCheck, selectedAdmission]);

	const editAdmissionValues = getDiffObj(formik.values, selectedAdmission);

	return (
		<>
			<div className={styles.container}>
				<div className={styles.headerContainer}>
					<h1 className={styles.header}>{`${selectedPatient.firstname} ${selectedPatient.lastname}`}</h1>
					<Header icon={faBedPulse}>Edit Admission</Header>
				</div>
				<div className={styles.formContainer}>
					<AdmissionForm
						formik={formik}
						dischargeBox={{ dischargeCheck, setDischargeCheck }}
						editAdmissionValues={editAdmissionValues}
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
					disabled={editAdmissionValues.length === 0 ? true : false}
					type="submit"
				/>
				<Button
					label="Reset"
					className={cls(styles.resetBtn, styles.button)}
					onClick={() => {
						if (selectedAdmission.datedischarged === "") setDischargeCheck(false);
						else setDischargeCheck(true);
						formik.handleReset();
					}}
					disabled={editAdmissionValues.length === 0 ? true : false}
				/>
				<Button label="Back" className={styles.button} onClick={() => setRecordsView("admissionlist")} />
			</BottomMenu>
			<ConfirmModal
				enabled={confirmEdit}
				message={`Are you sure you want to EDIT admission details`}
				onConfirm={async () => {
					try {
						await toast.promise(
							editRecords.mutateAsync({ id: selectedAdmission._id, body: formik.values }),
							{
								pending: "Saving Admission",
								success: "Admission Edited",
								error: "Admission Editing",
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

export default EditAdmission;
