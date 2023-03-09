import { configureStore } from "@reduxjs/toolkit";
import reducer from "./mainreducer";

export default function store() {
	return configureStore({ reducer });
}
