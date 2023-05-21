import axios, { AxiosError, AxiosInstance, HttpStatusCode } from 'axios';
import { toast } from 'react-toastify';
import { AuthResponse } from 'src/types/auth.type';
import { getAccessTokenFromLS, removeAccessTokenFromLS, setAccessTokenToLS } from 'src/utils/auth';

// const api = axios.create({
//   baseURL: 'https://api-ecom.duthanhduoc.com',
//   timeout: 10000,
//   headers: {
//     'Content-Type': 'application/json'
//   }
// });

// api.interceptors.request.use(function (config) {
//   // console.log(config);
//   return config;
// });

// api.interceptors.response.use(
//   function (response) {
//     return response;
//   },
//   function (error: AxiosError) {
//     if (error.response?.status !== HttpStatusCode.UnprocessableEntity) {
//       const data: any = error.response?.data;
//       const message = data?.message || error.message;
//       toast.error(message);
//     }

//     return Promise.reject(error);
//   }
// );

class Http {
  instance: AxiosInstance;
  private accessToken: string;
  constructor() {
    this.accessToken = getAccessTokenFromLS(); //Khởi tạo 1 lần duy nhất và lưu access_token vào trong ram
    this.instance = axios.create({
      baseURL: 'https://api-ecom.duthanhduoc.com',
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json'
      }
    });

    this.instance.interceptors.request.use(
      (config) => {
        if (this.accessToken && config.headers) {
          config.headers.Authorization = this.accessToken;
          /**
           * Lấy accessToken từ đối thượng HTTP tức là lấy dữ liệu từ RAM
           * Lấy accessToken từ localStorage tức là lấy dữ liệu từ ROM
           * ==> lấy từ RAM sẽ cho tốc độ tải dữ liệu nhanh hơn lấy từ ROM
           */
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    this.instance.interceptors.response.use(
      (response) => {
        console.log(response);
        const { url } = response.config;

        if (url === '/login' || url === '/register') {
          const { access_token } = (response.data as AuthResponse).data;
          this.accessToken = access_token;
          setAccessTokenToLS(access_token);
        } else if (url === '/logout') {
          this.accessToken = '';
          removeAccessTokenFromLS();
        }

        return response;
      },
      (error: AxiosError) => {
        if (error.response?.status !== HttpStatusCode.UnprocessableEntity) {
          const data: any = error.response?.data;
          const message = data?.message || error.message;
          toast.error(message);
        }

        return Promise.reject(error);
      }
    );
  }
}

const api = new Http().instance;

export default api;
