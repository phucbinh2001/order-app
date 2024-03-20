"use client";
import { CloseOutlined, StopOutlined } from "@ant-design/icons";
import { Button } from "antd";
import React, { useEffect, useRef, useState } from "react";
import { IosGuide, IosGuideRef } from "./components/IosGuide";

const InstallPWABanner = () => {
  const iosGuideRef = useRef<IosGuideRef>();
  const [supportsPWA, setSupportsPWA] = useState(false);
  const [promptInstall, setPromptInstall] = useState<any | null>(null);
  const [isInstalled, setIsInstalled] = useState(false);
  const [isClose, setIsClose] = useState(true);

  useEffect(() => {
    const handler = (e: any) => {
      e.preventDefault();
      setSupportsPWA(true);
      setPromptInstall(e);
    };

    // Check if the app is already installed
    const mediaQueryList = window.matchMedia("(display-mode: standalone)");
    console.log("mediaQuery", mediaQueryList);
    //@ts-ignore
    if (mediaQueryList.matches || window.navigator.standalone) {
      console.log("isInstalled");

      setIsInstalled(true);
    }
    window.addEventListener("beforeinstallprompt", handler);
    //Nếu người dùng đã đóng thì ko hiện lại
    const isClose = sessionStorage.getItem("isCloseBanner") == "true";
    setIsClose(isClose);

    return () => window.removeEventListener("beforeinstallprompt", handler);
  }, []);

  const handleInstall = async () => {
    if (!supportsPWA) {
      iosGuideRef.current?.handleOpen();
    }

    if (!promptInstall) {
      return;
    }
    promptInstall.prompt();
    const choiceResult = await promptInstall.userChoice;
    if (choiceResult.outcome === "accepted") {
      console.log("User accepted the A2HS prompt");
    } else {
      console.log("User dismissed the A2HS prompt");
    }
    setPromptInstall(null);
  };

  if (isInstalled || isClose) return <></>;

  return (
    <>
      <div className="max-w-[500px] mx-auto w-full bg-white/90 border-b py-1 relative">
        <CloseOutlined
          className="absolute right-1 top-1"
          onClick={() => {
            setIsClose(true);
            sessionStorage.setItem("isCloseBanner", "true");
          }}
        />
        <div className="flex p-3 gap-2 items-center">
          <img src="/logo.png" className="rounded-xl size-16" />
          <div>
            <b>Order App</b>
            <p className="text-slate-700 text-xs">
              Cài đặt ứng dụng <br /> để có trải nghiệm tốt nhất!
            </p>
          </div>
          <Button
            size="large"
            shape="round"
            type="primary"
            className="ml-auto"
            onClick={handleInstall}
          >
            Cài đặt
          </Button>
        </div>
      </div>
      <IosGuide ref={iosGuideRef} />
    </>
  );
};

export default InstallPWABanner;
