import Login from "components/containers/Login/Login";
import MainView from "components/containers/MainView/MainView";
import API from "lib/configs/axios";
import { useRoute } from "lib/hooks/useRoute";
import { useEffect } from "react";
import { useQuery } from "react-query";
import { ToastContainer } from "react-toastify";
import styles from "./App.module.scss";
import { useCookies } from "react-cookie";
import { cookieStatus } from "lib/configs/cookieConfigs";

function App() {
	const { loginState, setLogin } = useRoute();
	const [cookie] = useCookies();

	const connection = useQuery(["patients"], async () => {
		const response = await API.get("/patients");
		return response.data;
	});
	useQuery(["records"], async () => {
		const response = await API.get("/records");
		return response.data;
	});

	useEffect(() => {
		if (connection.isSuccess && cookie.user === cookieStatus) {
			setLogin(true);
		} else {
			setLogin(false);
		}
	}, [setLogin, connection.isSuccess, cookie]);

	return (
		<>
			<div className={styles.container}>{loginState ? <MainView /> : <Login />}</div>
			<ToastContainer hideProgressBar />
		</>
	);
}

export default App;
