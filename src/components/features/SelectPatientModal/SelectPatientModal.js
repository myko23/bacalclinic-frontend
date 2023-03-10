import InputBox from "components/common/InputBox/InputBox";
import Modal from "components/common/Modal/Modal";
import { useRecords } from "lib/hooks/useRecords";
import React from "react";
import styles from "./SelectPatientModal.module.scss";
import cls from "classnames";
import { useSelected } from "lib/hooks/useSelected";
import { useRoute } from "lib/hooks/useRoute";
import Button from "components/common/Button/Button";

const SelectPatientModal = ({ enabled, onCancel, onProceed }) => {
	const { patientData } = useRecords();
	const { setMainView, setRecordsView } = useRoute();
	const { selectedPatient, setSelectedPatient } = useSelected();
	if (!enabled) return null;

	const renderPatient = () => {
		return patientData.map((item) => {
			return (
				<div
					onClick={() => {
						setSelectedPatient(item._id);
					}}
					onDoubleClick={() => {
						onCancel();
						setMainView("records");
						setRecordsView("addconsultation");
					}}
					className={cls(styles.patientItem, item._id === selectedPatient._id && styles.patientItemSelected)}
				>{`${item.firstname} ${item.lastname}`}</div>
			);
		});
	};
	return (
		<Modal onCancel={onCancel}>
			<div className={styles.container}>
				<div className={styles.headerContainer}>
					<h1 className={styles.header}>Patient</h1>
					<InputBox label="Search" width="100%" />
				</div>
				<div className={styles.patientContainer}>{renderPatient()}</div>
				<div className={styles.buttonContainer}>
					<Button label="Back" onClick={onCancel} />
				</div>
			</div>
		</Modal>
	);
};

export default SelectPatientModal;
