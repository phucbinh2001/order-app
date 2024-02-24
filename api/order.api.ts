import { request } from "@/utils/request";
import { AxiosPromise } from "axios";

export const orderApi = {
  create: (data: any): AxiosPromise<any> =>
    request({
      url: "/order",
      data,
      method: "post",
    }),
  findAll: (): AxiosPromise<any> =>
    request({
      url: "/order",
    }),
};
