import Button from "components/common/Button/Button";
import InputBox from "components/common/InputBox/InputBox";
import { cookieStatus } from "lib/configs/cookieConfigs";
import { useRoute } from "lib/hooks/useRoute";
import React from "react";
import { useCookies } from "react-cookie";
import styles from "./Login.module.scss";

const Login = ({ databaseConnection }) => {
	const { setLogin } = useRoute();
	// eslint-disable-next-line no-unused-vars
	const [cookies, setCookies] = useCookies(["user"]);
	return (
		<div className={styles.container}>
			<div className={styles.loginBox}>
				<h1 className={styles.header}>Dada Clinic</h1>
				<div className={styles.inputContainer}>
					<InputBox label="Username" className={styles.inputBox} width="100%" />
					<InputBox label="password" className={styles.inputBox} type="password" width="100%" />
				</div>
				<Button
					label="Login"
					className={styles.loginBtn}
					onClick={() => {
						setLogin(true);
						setCookies("user", cookieStatus);
					}}
				/>
			</div>
		</div>
	);
};

export default Login;
