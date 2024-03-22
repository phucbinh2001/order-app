import { AxiosPromise } from "axios";
import { request } from "../utils/request";

export const deviceApi = {
  update: (data: any): AxiosPromise<any> =>
    request({
      url: `/device/update-device`,
      data,
      method: "put",
    }),
};
