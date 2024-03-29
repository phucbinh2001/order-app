import { request } from "@/utils/request";
import { AxiosPromise } from "axios";

export const tableApi = {
  findAll: (params?: any): AxiosPromise<any> =>
    request({
      url: "/table",
      params,
    }),
  summary: (): AxiosPromise<any> =>
    request({
      url: "/table/summary",
    }),
  create: (data: any): AxiosPromise<any> =>
    request({
      url: "/table",
      data,
      method: "post",
    }),
  update: (id: string, data: any): AxiosPromise<any> =>
    request({
      url: `/table/${id}`,
      data,
      method: "put",
    }),
  delete: (id: string): AxiosPromise<any> =>
    request({
      url: `/table/${id}`,
      method: "delete",
    }),
  updateSession: (sessionKey: string): AxiosPromise<any> =>
    request({
      url: `/table/${sessionKey}/new-session`,
      method: "post",
    }),
};
