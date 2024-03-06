import { request } from "@/utils/request";
import { AxiosPromise } from "axios";

export const orderApi = {
  create: (data: any): AxiosPromise<any> =>
    request({
      url: "/order",
      data,
      method: "post",
    }),
  update: (id: string, data: any): AxiosPromise<any> =>
    request({
      url: `/order/${id}`,
      method: "put",
      data,
    }),
  updatePosition: (data: any): AxiosPromise<any> =>
    request({
      url: `/order/update-position`,
      method: "post",
      data,
    }),
  getDetailById: (id: string): AxiosPromise<any> =>
    request({
      url: `/order/${id}`,
    }),
  getOrdersBySessionKey: (sessionKey: string): AxiosPromise<any> =>
    request({
      url: `/order/${sessionKey}/session`,
    }),
  findAll: (params?: any): AxiosPromise<any> =>
    request({
      url: "/order",
      params,
    }),
};
