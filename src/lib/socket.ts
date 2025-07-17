import { io } from "socket.io-client";

const socket = io("http://localhost:3001"); // porta do NestJS

export default socket;
