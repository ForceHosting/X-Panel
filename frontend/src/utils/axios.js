import axios from 'axios';
import { serverIP } from '../config';

// ----------------------------------------------------------------------

const axiosInstance = axios.create({
  baseURL: serverIP,
});

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
);

export default axiosInstance;
