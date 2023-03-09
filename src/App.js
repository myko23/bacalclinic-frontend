import Login from "components/containers/Login/Login";
import MainView from "components/containers/MainView/MainView";
import API from "lib/configs/axios";
import { useState } from "react";
import { useQuery } from "react-query";
import { ToastContainer } from "react-toastify";
import styles from "./App.module.scss";

function App() {
	useQuery(["patients"], async () => {
		const response = await API.get("/patients");
		return response.data;
	});
	useQuery(["records"], async () => {
		const response = await API.get("/records");
		return response.data;
	});

	const [login, setLogin] = useState(true);
	return (
		<>
			<div className={styles.container}>{login ? <MainView /> : <Login />}</div>
			<ToastContainer hideProgressBar />
		</>
	);
}

export default App;
