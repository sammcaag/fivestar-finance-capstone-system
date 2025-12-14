import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://104.248.97.19/api", // Backend URL
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

export default axiosInstance;
