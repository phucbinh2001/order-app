import { AxiosPromise } from "axios";
import { request } from "../utils/request";

export const foodApi = {
  findAll: (params: any): AxiosPromise<any> =>
    request({
      url: "/food",
      params,
    }),
};
