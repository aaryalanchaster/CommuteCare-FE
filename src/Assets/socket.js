import io from "socket.io-client";

const SOCKET_URL = "ws://https://commutecare-vercel.vercel.app"; // replace with your WebSocket server URL

const socket = io(SOCKET_URL);

socket.on("connect", () => {
  console.log("Socket connected!");
});

socket.on("disconnect", () => {
  console.log("Socket disconnected!");
});

export { socket };
