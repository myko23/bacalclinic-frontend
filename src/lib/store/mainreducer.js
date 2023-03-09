import { combineReducers } from "redux";
import routeReducer from "./reducers/routeReducer";
import selectedReducer from "./reducers/selectedReducer";

export default combineReducers({
	selected: selectedReducer,
	route: routeReducer,
});
