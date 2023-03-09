import { getRouteState, setMainViewState, setRecordsViewState } from "lib/store/reducers/routeReducer";
import { useDispatch, useSelector } from "react-redux";

export const useRoute = () => {
	const { recordsview, mainview } = useSelector(getRouteState);
	const dispatch = useDispatch();

	const setRecordsView = (route) => {
		setRecordsViewState(dispatch)(route);
	};
	const setMainView = (route) => {
		setMainViewState(dispatch)(route);
	};

	return { recordsview, mainview, setRecordsView, setMainView };
};
