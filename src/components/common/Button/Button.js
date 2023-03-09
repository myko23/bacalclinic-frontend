import React from "react";
import styles from "./Button.module.scss";
import cls from "classnames";

const Button = ({ label, className, onClick, disabled = false, ...props }) => {
	return (
		<button
			className={cls(styles.container, className, disabled && styles.disabled)}
			onClick={onClick}
			disabled={disabled}
			{...props}
		>
			{label}
		</button>
	);
};

export default Button;
