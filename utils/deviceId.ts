import { v4 as uuidv4 } from "uuid";

export const registerDeviceId = () => {
  let deviceId = localStorage.getItem("deviceId");
  if (deviceId) return;
  deviceId = uuidv4();
  localStorage.setItem("deviceId", deviceId);
};

export const getDeviceId = () => {
  const deviceId = localStorage.getItem("deviceId");
  return deviceId;
};
