// lib/socket.ts
import { io, Socket } from "socket.io-client";

let socket: Socket | null = null;

// export const socketSSR = io("http://localhost:3001/", {
//   transports: ["websocket"],
//   reconnectionAttempts: 3,
//   timeout: 5000,
// });

export const socketSSR = io("https://planning-poker-server-55kj.onrender.com/", {
  transports: ["websocket"],
  reconnectionAttempts: 3,
  timeout: 5000,
});

export const getSocket = () => {
  if (!socket && typeof window !== "undefined") {
    socket = io(
      // 🌍 Produção
      // "https://planning-poker-server-55kj.onrender.com/",
      
      // 💻 Local (descomente essa linha se quiser rodar localmente)
      "http://localhost:3001/",

      {
        transports: ["websocket"],
        reconnectionAttempts: 3,
        timeout: 5000,
      }
    );

    socket.on("connect_error", (err) => {
      console.error("Erro de conexão:", err);
      alert("Não foi possível conectar ao servidor. Verifique sua internet ou firewall.");
    });

    socket.on("disconnect", (reason) => {
      if (reason !== "io client disconnect") {
        alert("Você foi desconectado do servidor. Tentando reconectar...");
      }
    });
  }
  return socket;
};
