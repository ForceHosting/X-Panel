import axios from 'axios';
// config

// ----------------------------------------------------------------------

const axiosInstance = axios.create({
  baseURL: '',
});

axiosInstance.interceptors.response.use(
  (response) => response,
);

export default axiosInstance;
