import Button from "components/common/Button/Button";
import InputBox from "components/common/InputBox/InputBox";
import { cookieStatus } from "lib/configs/cookieConfigs";
import { useRoute } from "lib/hooks/useRoute";
import { checkCred } from "lib/utils/checkCred";
import React, { useState } from "react";
import { useCookies } from "react-cookie";
import styles from "./Login.module.scss";

const Login = ({ databaseConnection }) => {
	const { setLogin } = useRoute();
	// eslint-disable-next-line no-unused-vars
	const [cookies, setCookies] = useCookies(["user"]);

	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [credentials, setCredentials] = useState(false);
	return (
		<div className={styles.container}>
			<div className={styles.loginBox}>
				<h1 className={styles.header}>Dada Clinic</h1>
				<div className={styles.inputContainer}>
					<InputBox
						label="Username"
						className={styles.inputBox}
						width="100%"
						value={username}
						onChange={(e) => setUsername(e.target.value)}
					/>
					<InputBox
						label="password"
						className={styles.inputBox}
						type="password"
						width="100%"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
					/>
				</div>
				<div className={styles.buttonContainer}>
					{credentials && <p className={styles.credentials}>Username or Password is wrong</p>}
					<Button
						label="Login"
						className={styles.loginBtn}
						onClick={() => {
							const credentials = checkCred(username, password);
							if (credentials) {
								setCredentials(false);
								setCookies("user", cookieStatus);
								setLogin(true);
							} else setCredentials(true);
						}}
					/>
				</div>
			</div>
		</div>
	);
};

export default Login;
