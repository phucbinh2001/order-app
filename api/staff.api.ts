import { request } from "@/utils/request";
import { AxiosPromise } from "axios";

export const staffApi = {
  findAll: (params?: any): AxiosPromise<any> =>
    request({
      url: "/user",
      params,
    }),
  create: (data: any): AxiosPromise<any> =>
    request({
      url: "/user",
      data,
      method: "post",
    }),
  update: (id: string, data: any): AxiosPromise<any> =>
    request({
      url: `/user/${id}`,
      data,
      method: "put",
    }),
  delete: (id: string): AxiosPromise<any> =>
    request({
      url: `/user/${id}`,
      method: "delete",
    }),
};
