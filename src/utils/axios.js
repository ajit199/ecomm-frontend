import axios from "axios";
import { toast } from "react-toastify";
// Set up axios instance with default configuration
const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

// axiosInstance.interceptors.response.

// Add a response interceptor
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      const errorMessage = error.response.data.message || "An error occurred";
      toast.error(errorMessage); // Display error message using react-toastify
    } else if (error.request) {
      // The request was made but no response was received
      toast.error("No response from server");
    } else {
      // Something happened in setting up the request that triggered an error
      toast.error("An error occurred");
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
