import NavBar from "components/features/NavBar/NavBar";
import React from "react";
import Records from "../Records/Records";
import styles from "./MainView.module.scss";

const MainView = () => {
	return (
		<div className={styles.container}>
			<NavBar />
			<Records />
		</div>
	);
};

export default MainView;
