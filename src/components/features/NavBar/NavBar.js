import { useRoute } from "lib/hooks/useRoute";
import React from "react";
import styles from "./NavBar.module.scss";

const NavBar = () => {
	const { setRecordsView } = useRoute();
	return (
		<div className={styles.container}>
			<h1 className={styles.header}>Dada Clinic</h1>
			<div className={styles.navContainer}>
				<p
					className={styles.navItem}
					onClick={() => {
						setRecordsView("patientlist");
					}}
				>
					Patients
				</p>
				<p className={styles.navItem}>Consultation</p>
				<p className={styles.navItem}>Admission</p>
			</div>
		</div>
	);
};

export default NavBar;
