import BottomMenu from "components/common/BottomMenu/BottomMenu";
import { useFormik } from "formik";
import { useSelected } from "lib/hooks/useSelected";
import _ from "lodash";
import { DateTime } from "luxon";
import React, { useEffect, useState } from "react";
import AdmissionForm from "../AdmissionForm/AdmissionForm";
import styles from "./AddAdmission.module.scss";
import cls from "classnames";
import Button from "components/common/Button/Button";
import { recordsYupSchema } from "lib/schema/recordsSchema";
import { useAddRecordsMutation } from "lib/api/recordsAPI";
import ConfirmModal from "components/common/ConfirmModal/ConfirmModal";
import { toast } from "react-toastify";
import { useRoute } from "lib/hooks/useRoute";
import Header from "components/common/Header/Header";
import { faBedPulse } from "@fortawesome/free-solid-svg-icons";

const AddAdmission = () => {
	const { selectedPatient } = useSelected();
	const [dischargeCheck, setDischargeCheck] = useState(false);
	const [confirmAdd, setConfirmAdd] = useState(false);
	const { setRecordsView } = useRoute();
	const addRecords = useAddRecordsMutation();

	const formik = useFormik({
		enableReinitialize: true,
		initialValues: {
			dateofconsult: DateTime.now().toFormat("MM-dd-yyyy"),
			datedischarged: "",
			disposition: "",
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

	useEffect(() => {
		if (!dischargeCheck) {
			formik.setFieldValue("datedischarged", "");
			formik.setFieldValue("disposition", "");
		} else {
			formik.setFieldValue("datedischarged", DateTime.now().toFormat("MM-dd-yyyy"));
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [dischargeCheck]);

	return (
		<>
			<div className={styles.container}>
				<div className={styles.headerContainer}>
					<h1 className={styles.header}>{`${selectedPatient.firstname} ${selectedPatient.lastname}`}</h1>
					<Header icon={faBedPulse}>Add Admission</Header>
				</div>
				<div className={styles.formContainer}>
					<AdmissionForm formik={formik} dischargeBox={{ dischargeCheck, setDischargeCheck }} />
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
				<Button
					label="Reset"
					className={cls(styles.resetBtn, styles.button)}
					onClick={() => {
						setDischargeCheck(false);
						formik.handleReset();
					}}
				/>
				<Button
					label="Back"
					className={styles.button}
					onClick={() => {
						setRecordsView("admissionlist");
					}}
				/>
			</BottomMenu>
			<ConfirmModal
				enabled={confirmAdd}
				message={`Are you sure you want to ADD a admission to the patient records`}
				onConfirm={async () => {
					try {
						await toast.promise(
							addRecords.mutateAsync({
								...formik.values,
								type: "admission",
								patient_id: selectedPatient._id,
							}),
							{
								pending: "Adding Admission",
								success: "Admission Added",
								error: "Unsuccesful Adding",
							}
						);

						setRecordsView("admissionlist");
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

export default AddAdmission;
