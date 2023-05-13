import axios, { AxiosError, HttpStatusCode } from 'axios';
import { toast } from 'react-toastify';

const api = axios.create({
  baseURL: 'https://api-ecom.duthanhduoc.com',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  }
});

api.interceptors.request.use(function (config) {
  // console.log(config);
  return config;
});

api.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error: AxiosError) {
    if (error.response?.status !== HttpStatusCode.UnprocessableEntity) {
      const data: any = error.response?.data;
      const message = data?.message || error.message;
      toast.error(message);
    }

    return Promise.reject(error);
  }
);

export default api;
