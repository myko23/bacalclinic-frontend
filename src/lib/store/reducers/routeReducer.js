import { createSlice } from "@reduxjs/toolkit";

const routeInitialState = {
	mainview: "records",
	recordsview: "patientlist",
};

const slice = createSlice({
	name: "route",
	initialState: routeInitialState,
	reducers: {
		mainViewSet: (route, action) => {
			route.mainview = action.payload;
		},
		recordsViewSet: (route, action) => {
			route.recordsview = action.payload;
		},
	},
});

export default slice.reducer;
const { mainViewSet, recordsViewSet } = slice.actions;

export const setMainViewState = (dispatch) => (route) => {
	dispatch(mainViewSet(route));
};

export const setRecordsViewState = (dispatch) => (route) => {
	dispatch(recordsViewSet(route));
};
export const getRouteState = (state) => state.route;
