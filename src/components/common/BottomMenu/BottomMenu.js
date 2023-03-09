import React from "react";
import styles from "./BottomMenu.module.scss";
import cls from "classnames";

const BottomMenu = ({ children, className }) => {
	return <div className={cls(styles.container, className)}>{children}</div>;
};

export default BottomMenu;
