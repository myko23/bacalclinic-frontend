import React from "react";
import styles from "./CheckBox.module.scss";
import cls from "classnames";

const CheckBox = ({ label = "CheckBox", active = true, setActive, className }) => {
	return (
		<div className={cls(styles.container, className)}>
			<div className={styles.checkBoxContainer} onClick={() => setActive(!active)}>
				{active && <div className={styles.checked}></div>}
			</div>
			<div className={styles.label}>{label}</div>
		</div>
	);
};

export default CheckBox;
