import axios from 'axios';
import { serverIP } from '../config';

// ----------------------------------------------------------------------

const axiosInstance = axios.create({
  baseURL: serverIP,
});

axiosInstance.interceptors.response.use(
  (response) => {
    console.log(response)
    return response;
  },
);

export default axiosInstance;
