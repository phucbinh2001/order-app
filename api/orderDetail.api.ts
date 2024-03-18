import { OrderStatusEnum } from "@/types/order";
import { request } from "@/utils/request";
import { AxiosPromise } from "axios";

export const orderDetailApi = {
  update: (id: string, data: any): AxiosPromise<any> =>
    request({
      url: `/order-detail/${id}`,
      method: "put",
      data,
    }),
  updateStatus: (id: string, status: OrderStatusEnum): AxiosPromise<any> =>
    request({
      url: `/order-detail/${id}/update-status`,
      method: "put",
      data: { status },
    }),
  updatePosition: (data: any): AxiosPromise<any> =>
    request({
      url: `/order-detail/update-position`,
      method: "post",
      data,
    }),
};
