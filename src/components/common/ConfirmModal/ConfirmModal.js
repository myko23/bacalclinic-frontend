import React from "react";
import Button from "../Button/Button";
import styles from "./ConfirmModal.module.scss";
import cls from "classnames";
import Modal from "../Modal/Modal";

const ConfirmModal = ({ enabled = true, onConfirm, onCancel, message }) => {
	if (!enabled) return null;

	return (
		<Modal onCancel={onCancel}>
			<div className={styles.container}>
				<div className={styles.message}>{message}</div>
				<div className={styles.buttonContainer}>
					<Button className={cls(styles.button, styles.confirmBtn)} label="Confirm" onClick={onConfirm} />
					<Button className={cls(styles.button, styles.cancelBtn)} label="Cancel" onClick={onCancel} />
				</div>
			</div>
		</Modal>
	);
};

export default ConfirmModal;
