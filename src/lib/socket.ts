import { io } from "socket.io-client";

const socket = io("https://planning-poker-server-55kj.onrender.com/");

export default socket;
