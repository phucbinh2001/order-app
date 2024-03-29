import { message } from "antd";
import axios from "axios";
import Cookies from "js-cookie";
import { getDeviceId } from "./deviceId";

// create an axios instance
const service = axios.create({
  baseURL: process.env.NEXT_PUBLIC_APP_API_URL, // url = base url + request url
  timeout: 60000 * 2, // request timeout
});

// request interceptor
service.interceptors.request.use(
  (config) => {
    const token = Cookies.get("accessToken");
    if (token && config.headers) {
      config.headers["Authorization"] = "Bear " + token;
    }

    if (config.headers) {
      config.headers["deviceId"] = getDeviceId();
    }

    return config;
  },
  (error) => {
    // do something with request error
    // eslint-disable-next-line no-console

    return Promise.reject(error);
  }
);

// response interceptor
service.interceptors.response.use(
  /**
   * If you want to get http information such as headers or status
   * Please return  response => response
   */

  /**
   * Determine the request status by custom code
   * Here is just an example
   * You can also judge the status by HTTP Status Code
   */
  (response) => {
    const res = response.data;
    // if the custom code is not 20000, it is judged as an error.
    if (response.status !== 200 && response.status !== 201) {
      return Promise.reject(new Error(res.message || "Error"));
    } else {
      return res;
    }
  },
  (error) => {
    let status = error.response ? error.response.status : false;
    let msg = "";
    if (status) {
      msg = error.response.data.message;
    } else {
      msg = error.errors;
    }
    if (typeof window !== "undefined") {
      message.error(msg);
      //Handle user login on other device
      if (status == 401) {
        message.warning("Vui lòng đăng nhập lại");
      }
    }

    return Promise.reject(error);
  }
);

export { service as request };
