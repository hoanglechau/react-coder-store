import axios from 'axios';
import { BASE_URL } from './config';

const apiService = axios.create({
  baseURL: BASE_URL,
});

apiService.interceptors.request.use(
  (request) => {
    console.log('Start Request', request);
    return request;
  },
  (error) => {
    console.log('REQUEST ERROR', error);
    return Promise.reject(error);
  },
);

apiService.interceptors.response.use(
  (response) => {
    console.log('Response', response);
    return response;
  },
  (error) => {
    console.log('RESPONSE ERROR', error);
    return Promise.reject(error);
  },
);

export default apiService;
