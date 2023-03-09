import React from "react";
import styles from "./InputBox.module.scss";
import cls from "classnames";

const InputBox = ({ label, className, width = "20rem", disabled, formikError, ...props }) => {
	return (
		<div className={cls(styles.container, className, disabled && styles.disabled)} style={{ width }}>
			<div className={styles.labelContainer}>
				<span className={styles.label}>{label}</span>
				{formikError && <span className={styles.errorMessage}>Required</span>}
			</div>
			<input type="text" className={styles.input} {...props} disabled={disabled} />
		</div>
	);
};

export default InputBox;
