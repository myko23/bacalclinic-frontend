import React from "react";
import styles from "./FormSection.module.scss";
import cls from "classnames";

const FormSection = ({ header = "Header", children, border = true }) => {
	return (
		<div className={cls(styles.container, border && styles.borderBottom)}>
			<h1 className={styles.header}>{header}</h1>
			<div className={styles.formContent}>{children}</div>
		</div>
	);
};

export default FormSection;
