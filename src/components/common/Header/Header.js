import { faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import styles from "./Header.module.scss";

const Header = ({ children, icon = faUser }) => {
	return (
		<div className={styles.container}>
			<FontAwesomeIcon icon={icon} className={styles.icon} />
			<h1 className={styles.header}>{children}</h1>
		</div>
	);
};

export default Header;
