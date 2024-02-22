import { request } from "@/utils/request";
import { AxiosPromise } from "axios";

export const tableApi = {
  findAll: (): AxiosPromise<any> =>
    request({
      url: "/table",
    }),
};
