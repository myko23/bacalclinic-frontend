import {
	getRouteState,
	setGeneralConsultationViewState,
	setMainViewState,
	setRecordsViewState,
} from "lib/store/reducers/routeReducer";
import { useDispatch, useSelector } from "react-redux";

export const useRoute = () => {
	const { recordsview, mainview, generalconsultationview, generaladmissionview } = useSelector(getRouteState);
	const dispatch = useDispatch();

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
		setGeneralConsultationViewState(dispatch)(route);
	};

	return {
		recordsview,
		mainview,
		generalconsultationview,
		generaladmissionview,
		setRecordsView,
		setMainView,
		setGeneralConsultationView,
		setGeneralAdmissionView,
	};
};
