import React from "react";
import styles from "./DateBox.module.scss";
import cls from "classnames";
import ReactDatePicker from "react-datepicker";

const DateBox = ({ label, className, width = "20rem", ...props }) => {
	return (
		<div className={cls(styles.container, className)} style={{ width }}>
			{label && <p className={styles.label}>{label}</p>}
			<ReactDatePicker className={styles.date} {...props} />
		</div>
	);
};

export default DateBox;
