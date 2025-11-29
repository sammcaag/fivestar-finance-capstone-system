import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:5500", // Backend URL
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

export default axiosInstance;
