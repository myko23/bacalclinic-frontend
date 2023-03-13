import axios from "axios";

const API = axios.create({
	baseURL: "https://bacal-clinic-backend.onrender.com/",
});

export default API;
