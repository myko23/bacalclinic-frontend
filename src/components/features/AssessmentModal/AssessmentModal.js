import Modal from "components/common/Modal/Modal";
import styles from "./AssessmentModal.module.scss";
import React, { useState } from "react";
import Header from "components/common/Header/Header";
import { faBookMedical } from "@fortawesome/free-solid-svg-icons";
import InputBox from "components/common/InputBox/InputBox";
import Button from "components/common/Button/Button";
import { useAssessment } from "lib/hooks/useAssessment";

const AssessmentModal = ({ enabled, onCancel, formik }) => {
	const { assessmentData } = useAssessment();
	const [searchAssessment, setSearchAssessment] = useState("");
	if (!enabled) return null;

	const searchAssessmentData = assessmentData.filter((item) => {
		if (item.toLowerCase().includes(searchAssessment.toLowerCase())) return item;
		return null;
	});
	const renderAssessment = () => {
		return searchAssessmentData.map((item) => {
			return (
				<div
					key={item}
					className={styles.assessmentItem}
					onClick={() => {
						formik.setFieldValue("assessment", item);
					}}
					onDoubleClick={onCancel}
				>
					{item}
				</div>
			);
		});
	};

	return (
		<Modal onCancel={onCancel}>
			<div className={styles.container}>
				<div className={styles.headerContainer}>
					<Header icon={faBookMedical}>Assessment</Header>
					<InputBox
						label="Search"
						width="100%"
						value={searchAssessment}
						onChange={(e) => {
							setSearchAssessment(e.target.value);
						}}
					/>
				</div>
				<div className={styles.assessmentContainer}>{renderAssessment()}</div>
				<div className={styles.buttonContainer}>
					<Button label="Back" onClick={onCancel} />
				</div>
			</div>
		</Modal>
	);
};

export default AssessmentModal;
