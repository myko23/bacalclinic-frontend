import React from "react";
import styles from "./FormGroup.module.scss";

const FormGroup = ({ children }) => {
	return <div className={styles.container}>{children}</div>;
};

export default FormGroup;
