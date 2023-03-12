import { createSlice } from "@reduxjs/toolkit";

const routeInitialState = {
	login: false,
	mainview: "records",
	recordsview: "patientlist",
	generalconsultationview: "days",
	generaladmissionview: "days",
};

const slice = createSlice({
	name: "route",
	initialState: routeInitialState,
	reducers: {
		loginSet: (route, action) => {
			route.login = action.payload;
		},
		mainViewSet: (route, action) => {
			route.mainview = action.payload;
		},
		recordsViewSet: (route, action) => {
			route.recordsview = action.payload;
		},
		generalConsultationViewSet: (route, action) => {
			route.generalconsultationview = action.payload;
		},
		generalAdmissionViewSet: (route, action) => {
			route.generaladmissionview = action.payload;
		},
	},
});

export default slice.reducer;
const { mainViewSet, recordsViewSet, generalConsultationViewSet, generalAdmissionViewSet, loginSet } = slice.actions;

export const setLoginState = (dispatch) => (route) => {
	dispatch(loginSet(route));
};
export const setMainViewState = (dispatch) => (route) => {
	dispatch(mainViewSet(route));
};

export const setRecordsViewState = (dispatch) => (route) => {
	dispatch(recordsViewSet(route));
};
export const setGeneralConsultationViewState = (dispatch) => (route) => {
	dispatch(generalConsultationViewSet(route));
};
export const setGeneralAdmissionViewState = (dispatch) => (route) => {
	dispatch(generalAdmissionViewSet(route));
};
export const getRouteState = (state) => state.route;
