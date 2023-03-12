import {
	getRouteState,
	setGeneralAdmissionViewState,
	setGeneralConsultationViewState,
	setLoginState,
	setMainViewState,
	setRecordsViewState,
} from "lib/store/reducers/routeReducer";
import { useDispatch, useSelector } from "react-redux";

export const useRoute = () => {
	const { recordsview, mainview, generalconsultationview, generaladmissionview, login } = useSelector(getRouteState);
	const dispatch = useDispatch();

	const setLogin = (route) => {
		setLoginState(dispatch)(route);
	};
	const setRecordsView = (route) => {
		setRecordsViewState(dispatch)(route);
	};
	const setMainView = (route) => {
		setMainViewState(dispatch)(route);
	};
	const setGeneralConsultationView = (route) => {
		setGeneralConsultationViewState(dispatch)(route);
	};
	const setGeneralAdmissionView = (route) => {
		setGeneralAdmissionViewState(dispatch)(route);
	};

	return {
		loginState: login,
		recordsview,
		mainview,
		generalconsultationview,
		generaladmissionview,
		setRecordsView,
		setMainView,
		setGeneralConsultationView,
		setGeneralAdmissionView,
		setLogin,
	};
};
