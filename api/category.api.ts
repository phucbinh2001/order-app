import { request } from "@/utils/request";
import { AxiosPromise } from "axios";

export const categoryApi = {
  findAll: (): AxiosPromise<any> =>
    request({
      url: "/category",
    }),
};
