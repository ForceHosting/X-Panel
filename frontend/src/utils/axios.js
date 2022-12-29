import axios from 'axios';
// config

// ----------------------------------------------------------------------

const axiosInstance = axios.create({
  baseURL: 'http://localhost:25566',
});

axiosInstance.interceptors.response.use(
  (response) => response,
);

export default axiosInstance;
