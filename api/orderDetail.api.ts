import { request } from "@/utils/request";
import { AxiosPromise } from "axios";

export const orderDetailApi = {
  update: (id: string, data: any): AxiosPromise<any> =>
    request({
      url: `/order-detail/${id}`,
      method: "put",
      data,
    }),
};
