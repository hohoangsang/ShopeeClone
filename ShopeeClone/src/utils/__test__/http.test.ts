// Test độc lập file gọi api
// Tránh việc gọi đên các file liên quan
import { HttpStatusCode, isAxiosError } from "axios";
import { ProductList } from "src/@types/product.type";
import { ResponseSuccessType } from "src/@types/utils.type";
import { Http } from "src/api/api";
import { URL as URL_Categories } from 'src/api/category.api';
import { URL as URL_Products } from 'src/api/product.api';
import { describe, expect, test } from "vitest";

describe('Test call api without attach access token', () => {
  test('get list product', async () => {
    try {
      // const http = new Http().instance;
      // const res = await http.get<ResponseSuccessType<ProductList>>(URL_Products);
      // const { products } = res.data.data;
      // expect(res.statusText).toBe('OK');
      // expect(res.status).toEqual(HttpStatusCode.Ok);
      expect(1).toBe(0);
    } catch (error: unknown) {
      // if (isAxiosError(error)) {
      //   console.log(error);
      //   expect(error.response?.status).not.toEqual(HttpStatusCode.Ok);
      // }
      console.log(error);
      // expect(1).toBe(0)
    }
  });

  // test('get one product', async () => {
  //   try {
  //     const http = new Http().instance;
  //     const res = await http.get(`${URL_Products}/60afb2c76ef5b902180aacba`);
  //     expect(res.status).toBe(HttpStatusCode.Ok);
  //   } catch (error: unknown) {
  //     if (isAxiosError(error)) {
  //       console.log(error);
  //     }
  //   }
  // });

  // test('get all categories', async () => {
  //   try {
  //     const http = new Http().instance;
  //     const res = await http.get(URL_Categories);
  //     expect(res.status).toEqual(HttpStatusCode.Ok);
  //   } catch (error: unknown) {
  //     if (isAxiosError(error)) {
  //       console.log(error);
  //       expect(error.response?.status).not.toEqual(HttpStatusCode.Ok);
  //     }
  //   }
  // });
});
