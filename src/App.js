import Login from "components/containers/Login/Login";
import MainView from "components/containers/MainView/MainView";
import API from "lib/configs/axios";
import { useRoute } from "lib/hooks/useRoute";
import { useEffect } from "react";
import { useQuery } from "react-query";
import { ToastContainer } from "react-toastify";
import styles from "./App.module.scss";

function App() {
	const { loginState, setLogin } = useRoute();

	const connection = useQuery(["patients"], async () => {
		const response = await API.get("/patients");
		return response.data;
	});
	useQuery(["records"], async () => {
		const response = await API.get("/records");
		return response.data;
	});

	useEffect(() => {
		if (connection.isSuccess === false) {
			setLogin(false);
		}
	}, [setLogin, connection.isSuccess]);

	// eslint-disable-next-line no-unused-vars
	return (
		<>
			<div className={styles.container}>{loginState ? <MainView /> : <Login />}</div>
			<ToastContainer hideProgressBar />
		</>
	);
}

export default App;
