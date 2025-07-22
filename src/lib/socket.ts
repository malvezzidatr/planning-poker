import { io } from "socket.io-client";

// const socket = io("https://planning-poker-server-55kj.onrender.com/");
const socket = io("http://localhost:3001/", {
  transports: ["websocket"],
});


export default socket;
