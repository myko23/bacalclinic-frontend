import React from "react";
import styles from "./Modal.module.scss";

const Modal = ({ children, onCancel }) => {
	return (
		<div className={styles.container}>
			<div className={styles.overlay} onClick={onCancel} />
			<div className={styles.modalContent}>{children}</div>
		</div>
	);
};

export default Modal;
