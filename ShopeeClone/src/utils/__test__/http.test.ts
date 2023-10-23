// Test độc lập file gọi api
// Tránh việc gọi đên các file liên quan
import { HttpStatusCode } from "axios";
import { AuthResponse } from "src/@types/auth.type";
import { Category } from "src/@types/category.type";
import { Product, ProductList } from "src/@types/product.type";
import { ResponseSuccessType } from "src/@types/utils.type";
import { Http } from "src/api/api";
import { URL_LOGIN } from "src/api/auth.api";
import { URL as URL_Categories } from 'src/api/category.api';
import { URL as URL_Products } from 'src/api/product.api';
import { beforeEach, describe, expect, test, afterEach, vi, beforeAll, afterAll, it } from "vitest";
import { clearLS, getAccessTokenFromLS, getProfileFromLS, getRefreshTokenFromLS } from "../auth";
import { isAxiosError } from "../utils";

const validAccount = {
  email: "sang5@gmail.com",
  password: "123123123"
}

const invalidAccount = {
  email: "sang5@gmail.com",
  password: "123321321"
}

describe('Test call api without attach access token', () => {
  beforeEach(() => {
    clearLS();
  });

  test('get list product successfully', async () => {
    const http = new Http().instance;
    const res = await http.get<ResponseSuccessType<ProductList>>(URL_Products);
    const { products } = res.data.data;
    expect(res.statusText).toBe('OK');
    expect(res.status).toEqual(HttpStatusCode.Ok);
    expect(Array.isArray(res.data.data.products)).toBeTruthy();
    expect(res.data.data.pagination).toBeTruthy();

  });

  test('get one product successfully', async () => {
    const http = new Http().instance;
    const res = await http.get<ResponseSuccessType<Product>>(`${URL_Products}/60afb2c76ef5b902180aacba`);
    expect(res.status).toBe(HttpStatusCode.Ok);
    expect(res.data.data).toBeTruthy();
  });

  test('get all categories successfully', async () => {
    const http = new Http().instance;
    const res = await http.get<ResponseSuccessType<Category[]>>(URL_Categories);
    expect(res.status).toEqual(HttpStatusCode.Ok);
    expect(Array.isArray(res.data.data)).toBeTruthy();
  });
});

describe('Login/Register api', () => {
  beforeEach(() => {
    clearLS();
  });

  test('Test logic login with valid account', async () => {
    const http = new Http().instance;
    const res = await http.post<AuthResponse>(URL_LOGIN, validAccount);
    expect(res.status).toBe(HttpStatusCode.Ok);
    expect(res.data.data.access_token).toBeTruthy();
    expect(res.data.data.refresh_token).toBeTruthy();
    expect(res.data.data.user).toBeTruthy();

    const access_token = getAccessTokenFromLS();
    const refresh_token = getRefreshTokenFromLS();
    const profile = getProfileFromLS();

    expect(access_token).toBeTruthy();
    expect(refresh_token).toBeTruthy();
    expect(profile).toBeTruthy();
  });

  test('Test logic login with invalid account', async () => {
    try {
      const http = new Http().instance;
      const res = await http.post<AuthResponse>(URL_LOGIN, invalidAccount);
    } catch (e) {
      if (isAxiosError(e)) {
        expect(e.response?.status).toBe(HttpStatusCode.UnprocessableEntity);
      } else {
        console.log(e);
      }
    }
  })
});

describe("Test call api which attach access token for each calling api", () => {
  beforeEach(() => {
    vi.useFakeTimers();
    clearLS();
  });
  afterEach(() => {
    vi.restoreAllMocks();
  });

  test('Get profile successfully', async () => {
    const http = new Http().instance;
    try {
      await http.post(URL_LOGIN, validAccount);

      const res = await http.get<AuthResponse>('/me');
      // vi.useFakeTimers();
      const getProfile = vi.fn(async () => { const res = await http.get('/me'); console.log(res); return res });
      setTimeout(getProfile, 4000);
      vi.runAllTimers();
      expect(getProfile).toHaveBeenCalledTimes(1);
      expect(res.status).toBe(HttpStatusCode.Ok);
      expect(res.data.data).toBeTruthy();
    } catch (error) {
      // if (isAxiosError(error)) {
      //   expect(error.response?.status).toBe(HttpStatusCode.Unauthorized);
      //   console.log('Unauthorized error');
      // } else {
      //   console.log(error);
      // }
      console.log(error);
    };
  });
});
