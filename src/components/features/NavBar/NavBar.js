import { useRoute } from "lib/hooks/useRoute";
import React from "react";
import styles from "./NavBar.module.scss";
import cls from "classnames";

const NavBar = () => {
	const { setRecordsView, setMainView, mainview } = useRoute();
	return (
		<div className={styles.container}>
			<h1 className={styles.header}>Dada Clinic</h1>
			<div className={styles.navContainer}>
				<p
					className={cls(styles.navItem, mainview === "records" && styles.navItemSelected)}
					onClick={() => {
						setRecordsView("patientlist");
						setMainView("records");
					}}
				>
					Patients
				</p>
				<p
					className={cls(styles.navItem, mainview === "generalconsultation" && styles.navItemSelected)}
					onClick={() => {
						setMainView("generalconsultation");
					}}
				>
					Consultation
				</p>
				<p className={cls(styles.navItem, mainview === "generaladmission" && styles.navItemSelected)}>
					Admission
				</p>
				<p
					className={cls(styles.navItem, mainview === "generaladmitted" && styles.navItemSelected)}
					onClick={() => {
						setMainView("generaladmitted");
					}}
				>
					Admitted Patients
				</p>
			</div>
		</div>
	);
};

export default NavBar;
