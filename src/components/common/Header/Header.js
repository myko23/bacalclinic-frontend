import React from "react";
import styles from "./Header.module.scss";

const Header = ({ children }) => {
	return <div className={styles.container}>{children}</div>;
};

export default Header;
