import Cookies from "js-cookie";

export const setLoginCookie = (token: string, user: any) => {
  Cookies.set("accessToken", token);
  Cookies.set("user", JSON.stringify(user));
};
