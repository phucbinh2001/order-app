import OneSignal from "react-onesignal";
import { getDeviceId } from "./deviceId";

export const runOneSignal = () => {
  OneSignal.init({
    appId: process.env.NEXT_PUBLIC_ONE_SIGNAL_APP_ID + "",
    allowLocalhostAsSecureOrigin: true,
  }).then(() => {
    OneSignal.Slidedown.promptPush();
    const deviceId = getDeviceId();
    OneSignal.login(deviceId);
  });
};
