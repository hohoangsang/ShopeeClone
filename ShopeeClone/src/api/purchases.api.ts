import { ProductCart, Purchases, PurchaseListStatus, PurchaseStatus } from 'src/types/purchases.type';
import api from './api';
import { ResponseSuccessType } from 'src/types/utils.type';

const URL = '/purchases';

export const purchasesApi = {
  getPurchases: (params: { status: PurchaseListStatus }) => {
    return api.get<ResponseSuccessType<Purchases[]>>(URL, { params });
  },
  addToCart: (body: ProductCart) => {
    return api.post<ResponseSuccessType<Purchases>>(`${URL}/add-to-cart`, body);
  },
  updatePurchases: (body: ProductCart) => {
    return api.put(`${URL}/update-purchase`, body);
  },
  deletePurchases: (data: string[]) => {
    return api.delete(URL, {
      data
    });
  },
  buyPurchases: (body: ProductCart[]) => {
    return api.post(`${URL}/buy-products`, body);
  }
};
