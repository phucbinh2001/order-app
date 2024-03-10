import { Spin } from "antd";
import clsx from "clsx";
import React from "react";

const AppLoading = ({ customClass }: { customClass?: string }) => {
  return (
    <div
      className={clsx(
        "h-svh flex items-center justify-center flex-col gap-5",
        customClass
      )}
    >
      <img src="/logo.png" className="size-12" />
      <Spin spinning size="large" />
    </div>
  );
};

export default AppLoading;
