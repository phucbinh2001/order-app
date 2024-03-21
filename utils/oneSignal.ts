import OneSignal from "react-onesignal";

export default async function runOneSignal() {
  await OneSignal.init({
    // appId: process.env.NEXT_PUBLIC_ONE_SIGNAL_APP_ID || "",
    // allowLocalhostAsSecureOrigin: true,
    // safari_web_id: process.env.NEXT_PUBLIC_ONE_SIGNAL_SAFARI_ID,
    // notifyButton: {
    //   enable: true,
    // },
    appId: "a18bcab7-3ee7-4b1f-93ef-6dbb508a3c02",
    safari_web_id: "web.onesignal.auto.19aac151-6a52-4f31-b603-0bf7908b06b4",
    notifyButton: {
      enable: true,
    },
    allowLocalhostAsSecureOrigin: true,
  });
  OneSignal.Slidedown.promptPush();
}
