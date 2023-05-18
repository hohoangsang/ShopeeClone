import axios, { Axios, AxiosError, AxiosInstance, HttpStatusCode } from 'axios';
import { toast } from 'react-toastify';
import { getAccessTokenFromLS } from 'src/utils/auth';

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

// class Http {
//   instance: AxiosInstance;
//   constructor() {
//     this.instance = axios.create({
//       baseURL: 'https://api-ecom.duthanhduoc.com',
//       timeout: 10000,
//       headers: {
//         'Content-Type': 'aplication/json'
//       }
//     });

//     this.instance.interceptors.request.use((config) => {
//       return config;
//     });

//     this.instance.interceptors.response.use(
//       function (response) {
//         return response;
//       },
//       function (error: AxiosError) {
//         if (error.response?.status !== HttpStatusCode.UnprocessableEntity) {
//           const data: any = error.response?.data;
//           const message = data?.message || error.message;
//           toast.error(message);
//         }

//         return Promise.reject(error);
//       }
//     );
//   }
// }

// const api = new Http().instance;

// export default api;
