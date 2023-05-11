import axios from 'axios';

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

api.interceptors.response.use(function (response) {
  return response;
});

export default api;
