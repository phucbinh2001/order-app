import { AxiosPromise } from "axios";
import { request } from "../utils/request";

export const foodApi = {
  findAll: (params: any): AxiosPromise<any> =>
    request({
      url: "/food",
      params,
    }),
  update: (id: string, data: any): AxiosPromise<any> =>
    request({
      url: `/food/${id}`,
      data,
      method: "put",
    }),
  delete: (id: string): AxiosPromise<any> =>
    request({
      url: `/food/${id}`,
      method: "delete",
    }),
  create: (data: any): AxiosPromise<any> =>
    request({
      url: `/food`,
      data,
      method: "post",
    }),
};
