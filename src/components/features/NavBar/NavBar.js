import { useRoute } from "lib/hooks/useRoute";
import React from "react";
import styles from "./NavBar.module.scss";
import cls from "classnames";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { useCookies } from "react-cookie";

const NavBar = () => {
	const { setRecordsView, setMainView, mainview, setLogin } = useRoute();
	// eslint-disable-next-line no-unused-vars
	const [cookie, setCookies, removeCookies] = useCookies();

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
				<p
					className={cls(styles.navItem, mainview === "generaladmission" && styles.navItemSelected)}
					onClick={() => {
						setMainView("generaladmission");
					}}
				>
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
				<p
					className={cls(styles.navItem, mainview === "billings" && styles.navItemSelected)}
					onClick={() => {
						setMainView("billings");
					}}
				>
					Billings
				</p>
			</div>
			<FontAwesomeIcon
				icon={faRightFromBracket}
				className={styles.logout}
				onClick={() => {
					removeCookies("user");
					setLogin(false);
				}}
			/>
		</div>
	);
};

export default NavBar;
