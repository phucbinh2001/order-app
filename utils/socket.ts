import { io } from "socket.io-client";

// "undefined" means the URL will be computed from the `window.location` object
const URL =
  process.env.NEXT_PUBLIC_IS_DEV === "false"
    ? "https://nodejs-express-mongodb-rest-api.onrender.com"
    : "http://localhost:8017";

export const socket = io(URL);
