import axios from 'axios';
// config
import { serverIP } from '../config';

// ----------------------------------------------------------------------

const axiosInstance = axios.create({
  baseURL: serverIP,
});

axiosInstance.interceptors.response.use(
  (response) => response,
);

export default axiosInstance;
