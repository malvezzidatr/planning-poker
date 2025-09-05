import { io } from "socket.io-client";

const socket = io("https://planning-poker-server-55kj.onrender.com/", {
  transports: ["websocket"],
  reconnectionAttempts: 3,
  timeout: 5000,
});

// const socket = io("http://localhost:3001/", {
//   transports: ["websocket"],
//   reconnectionAttempts: 3,
//   timeout: 5000,
// });

socket.on("connect_error", (err) => {
  console.error("Erro de conexão:", err);
  alert("Não foi possível conectar ao servidor. Verifique sua internet ou firewall.");
});

socket.on("disconnect", (reason) => {
  if (reason !== "io client disconnect") {
    alert("Você foi desconectado do servidor. Tentando reconectar...");
  }
});

export default socket;
