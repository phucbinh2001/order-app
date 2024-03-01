import { Spin } from "antd";
import React from "react";

const AppLoading = () => {
  return (
    <div className="h-screen flex items-center justify-center flex-col gap-5">
      <img src="/logo.png" className="size-12" />
      <Spin spinning size="large" />
    </div>
  );
};

export default AppLoading;
