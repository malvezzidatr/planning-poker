"use client";

import { useRouter, useParams } from "next/navigation";
import { useEffect, useState } from "react";
import socket from "../../../lib/socket";

export default function RoomPage() {
  const router = useRouter();
  const { roomId } = useParams();

  const [username, setUsername] = useState("");
  const [joined, setJoined] = useState(false);
  const [users, setUsers] = useState<string[]>([]);
  const [card, setCard] = useState("");
  const [votes, setVotes] = useState<Record<string, string> | null>(null);
  const [revealed, setRevealed] = useState(false);
  const [votedUsers, setVotedUsers] = useState<Set<string>>(new Set());
  const [copySuccess, setCopySuccess] = useState(false);

  useEffect(() => {
    if (!roomId || typeof roomId !== "string") return;

    socket.on("roomUpdate", (usernames: string[]) => {
      setUsers(usernames);
    });

    socket.on("revealVotes", (voteMap: Record<string, string>) => {
      setVotes(voteMap);
      setRevealed(true);
    });

    socket.on("resetVotes", () => {
      setVotes(null);
      setCard("");
      setRevealed(false);
      setVotedUsers(new Set());
    });

    socket.on("userVoted", (user: string) => {
      setVotedUsers((prev) => new Set(prev).add(user));
    });

    return () => {
      socket.off("roomUpdate");
      socket.off("revealVotes");
      socket.off("resetVotes");
      socket.off("userVoted");
    };
  }, [roomId]);

  const joinRoom = () => {
    socket.emit("joinRoom", { roomId, username });
    setJoined(true);
  };

  const submitVote = (value: string) => {
    setCard(value);
    socket.emit("vote", { roomId, username, card: value });
  };

  const revealVotes = () => {
    socket.emit("reveal", roomId);
  };

  const resetVotes = () => {
    socket.emit("reset", roomId);
  };

  const copyLink = async () => {
    if (!window || !roomId) return;
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    } catch {
      // falhou em copiar
    }
  };

  return (
    <>
      <header className="fixed top-0 left-0 w-full bg-white shadow px-10 py-6 flex items-center gap-4 z-50">
        <button
          onClick={() => router.push("/")}
          className="text-[#DF0979] hover:underline cursor-pointer transition"
        >
          Home
        </button>
        <span className="text-[#DF0979] select-none">{">"}</span>
        <span className="font-bold truncate max-w-xs text-[#DF0979] ">{roomId}</span>
      </header>

      {copySuccess && (
        <div className="fixed top-16 right-6 bg-[#DF0979] text-white px-4 py-2 rounded shadow z-50 select-none">
          Link copiado!
        </div>
      )}

      <main className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-6 pt-20">
        <div className="max-w-xl w-full mb-[100px] text-black">
          {!joined ? (
            <>
              <h1 className="text-2xl font-bold text-primary mb-4 flex items-center justify-between">
                Sala {roomId}
                <button
                  onClick={copyLink}
                  aria-label="Copiar link da sala"
                  title="Copiar link"
                  className="ml-2 text-[#DF0979] hover:text-[#BE0867] transition text-xl"
                >
                  📋
                </button>
              </h1>
              <input
                className="border p-2 w-full mb-4"
                placeholder="Digite seu nome"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <button
                onClick={joinRoom}
                className="w-full bg-[#DF0979] text-white p-2 rounded hover:bg-[#BE0867] cursor-pointer transition"
              >
                Entrar na sala
              </button>
            </>
          ) : (
            <>
              <div className="relative w-80 h-80 mx-auto my-10">
                <div
                  style={{ backgroundColor: "rgba(223, 9, 121, 0.25)" }}
                  className="border-4 border-[#DF0979] absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-[#BE0867] rounded-full w-[350px] h-[350px] flex items-center justify-center"
                >
                  <button
                    onClick={revealVotes}
                    className="bg-[#DF0979] transition opacity-100 text-white py-4 px-10 rounded hover:bg-[#BE0867] cursor-pointer"
                  >
                    Revelar Votos
                  </button>
                </div>

                {users.map((u, index) => {
                  const total = users.length;
                  const angle = (360 / total) * index;
                  return (
                    <div
                      key={u}
                      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transform origin-center"
                      style={{
                        transform: `rotate(${angle}deg) translate(12rem) rotate(-${angle}deg)`,
                      }}
                    >
                      <div className="bg-white text-black w-[80px] h-[120px] flex items-center justify-center rounded shadow text-sm whitespace-nowrap">
                        {u}{" "}
                        <span className="text-xs text-gray-500">
                          {votedUsers.has(u) ? "✅" : "⌛"}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>

              
              {votes && (
                <>
                  <h2 className="text-lg font-semibold mb-2 text-black">Resultado:</h2>
                  <ul className="mb-4 text-black">
                    {Object.entries(votes).map(([user, vote]) => (
                      <li key={user}>
                        <strong>{user}</strong>: {vote}
                      </li>
                    ))}
                  </ul>
                  <button
                    onClick={resetVotes}
                    className="bg-[#DF0979] text-white px-4 py-2 rounded hover:bg-[#BE0867] cursor-pointer transition"
                  >
                    Nova Rodada
                  </button>
                </>
              )}
            </>
          )}
        </div>
        
          <div className="fixed right-10 top-24 flex flex-col items-center">
            <h2 className="text-lg font-medium mb-2 text-black">Escolha sua carta:</h2>
            <div className="flex w-[165px] flex-wrap gap-6 mb-4">
              {["1", "2", "3", "5", "8", "13", "?"].map((value) => (
                <button
                  key={value}
                  onClick={() => submitVote(value)}
                  disabled={!!card}
                  className={`w-[70px] h-[100px] rounded text-[#DF0979] text-[20px] cursor-pointer ${
                    card === value
                      ? "bg-[#DF0979] text-white"
                      : "border-[#DF0979] hover:bg-[#BE0867] transition border-2"
                  }`}
                >
                  {value}
                </button>
              ))}
            </div>
          </div>
      </main>
    </>
  );
}
