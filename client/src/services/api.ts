/* eslint-disable react-hooks/rules-of-hooks */
import axios from "axios";
import { useNavigate } from "react-router-dom";

const navigate = useNavigate()

const api = axios.create({
  baseURL: "http://localhost:3000/",
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token"); // Assuming you store the token in localStorage
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    navigate("/")
    return Promise.reject(error);
    
  }
);


export default api
