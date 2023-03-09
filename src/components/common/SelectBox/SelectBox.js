import React from "react";
import styles from "./SelectBox.module.scss";
import cls from "classnames";

const SelectBox = ({ label, className, options = [{ value: "hey", label: "hey" }], ...props }) => {
	const renderOptions = () => {
		return options.map((option, index) => (
			<option key={index} value={option.value}>
				{option.label}
			</option>
		));
	};
	return (
		<div className={cls(styles.container, className)}>
			<p className={styles.label}>{label}</p>
			<select className={styles.select} {...props}>
				{renderOptions()}
			</select>
		</div>
	);
};

export default SelectBox;
