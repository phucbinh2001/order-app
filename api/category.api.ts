import { request } from "@/utils/request";
import { AxiosPromise } from "axios";

export const categoryApi = {
  findAll: (params?: any): AxiosPromise<any> =>
    request({
      url: "/category",
      params,
    }),
  create: (data: any): AxiosPromise<any> =>
    request({
      url: "/category",
      data,
      method: "post",
    }),
  update: (id: string, data: any): AxiosPromise<any> =>
    request({
      url: `/category/${id}`,
      data,
      method: "put",
    }),
  delete: (id: string): AxiosPromise<any> =>
    request({
      url: `/category/${id}`,
      method: "delete",
    }),
};
