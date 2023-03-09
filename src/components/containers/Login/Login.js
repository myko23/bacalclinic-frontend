import Button from "components/common/Button/Button";
import InputBox from "components/common/InputBox/InputBox";
import React from "react";
import styles from "./Login.module.scss";

const Login = () => {
	return (
		<div className={styles.container}>
			<div className={styles.loginBox}>
				<h1 className={styles.header}>Dada Clinic</h1>
				<div className={styles.inputContainer}>
					<InputBox label="Username" className={styles.inputBox} width="100%" />
					<InputBox label="password" className={styles.inputBox} type="password" width="100%" />
				</div>
				<Button label="Login" className={styles.loginBtn} />
			</div>
		</div>
	);
};

export default Login;
