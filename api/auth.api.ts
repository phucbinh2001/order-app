import { AxiosPromise } from "axios";
import { request } from "../utils/request";

export const authApi = {
  chefLogin: (data: any): AxiosPromise<any> =>
    request({
      url: `/login/chef`,
      data,
      method: "post",
    }),
  adminLogin: (data: any): AxiosPromise<any> =>
    request({
      url: `/login/admin`,
      data,
      method: "post",
    }),
};
