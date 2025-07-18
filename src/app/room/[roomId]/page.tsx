"use client";

import { useRouter, useParams } from "next/navigation";
import { useEffect, useState } from "react";
import socket from "../../../lib/socket";
import { motion } from "framer-motion";
import { GoVerified } from "react-icons/go";
import { RxCross1 } from "react-icons/rx";
import Header from "@/components/Header/Header";
import { MdAccountCircle } from "react-icons/md";

export default function RoomPage() {
  const { roomId } = useParams();

  const [username, setUsername] = useState("");
  const [joined, setJoined] = useState(false);
  const [users, setUsers] = useState<string[]>([]);
  const [card, setCard] = useState("");
  const [votes, setVotes] = useState<Record<string, string> | null>(null);
  const [revealed, setRevealed] = useState(false);
  const [votedUsers, setVotedUsers] = useState<Set<string>>(new Set());
  const [copySuccess, setCopySuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [showUserModal, setShowUserModal] = useState(false);
  const [showInviteModal, setShowInviteModal] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [newUsername, setNewUsername] = useState("");
  const [focusNewUsername, setFocusNewUsername] = useState(false);

  useEffect(() => {
    if (!roomId || typeof roomId !== "string") return;

    const storedUsername = localStorage.getItem("username");
    if (storedUsername && !joined) {
      setUsername(storedUsername);
      socket.emit("joinRoom", { roomId, username: storedUsername });
      setJoined(true);
    }

    setIsLoading(false);
  }, [roomId])

  useEffect(() => {
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

  if (isLoading) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-[#DF0979] border-opacity-75"></div>
      </main>
    )
  }

  const joinRoom = () => {
    socket.emit("joinRoom", { roomId, username });
    localStorage.setItem("username", username);
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

  const changeUsername = () => {
    if (!newUsername || newUsername.trim() === "") return;
    setUsername(newUsername);
    localStorage.setItem("username", newUsername);
    socket.emit("changeUsername", { roomId, oldUsername: username, newUsername });
    setShowUserModal(false);
  }

  return (
    <>
      <Header />

      {copySuccess && (
        <div className="fixed top-16 right-6 bg-[#DF0979] text-white px-4 py-2 rounded shadow z-50 select-none">
          Link copiado!
        </div>
      )}

      <main className="min-h-screen bg-[#F2EBDC] flex flex-col items-center justify-center p-6 pt-20">
        <div className="max-w-xl w-full mb-[100px] text-black">
          {!joined ? (
            <div className="bg-[#F2EBDC] p-12 rounded shadow-md">
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
            </div>
          ) : (
            <>
              <div className="relative w-80 h-80 mx-auto my-10">
                <div
                  
                  className="bg-[#F2EBDC] absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-full flex items-center justify-center"
                >
                  <button
                    onClick={votes ? resetVotes : revealVotes}
                    className="bg-[#5944A6] transition text-white w-50 h-30 rounded-full hover:opacity-85 cursor-pointer"
                  >
                    {votes ? "Nova Rodada": "Revelar Votos"}
                  </button>
                </div>
                {users.map((user, index) => {
                  const total = users.length ;
                  const angle = (360 / total) * index;
                  const hasVoted = votedUsers.has(user);
                  const vote = votes?.[user];

                  return (
                    <div
                      key={user}
                      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transform origin-center"
                      style={{
                        transform: `rotate(${angle}deg) translate(13rem) rotate(-${angle}deg)`,
                      }}
                    >
                      <div className="w-[65px] h-[90px] [perspective:1000px]">
                        <motion.div
                          className="relative w-full h-full"
                          animate={{ rotateY: votes ? 180 : 0 }}
                          transition={{ duration: 0.6 }}
                          style={{
                            transformStyle: "preserve-3d",
                          }}
                        >
                          <motion.div
                            className="absolute w-full h-full flex flex-col items-center justify-center rounded shadow text-sm border-2"
                            style={{
                              backfaceVisibility: "hidden",
                              color: hasVoted ? "white" : "#5944A6",
                            }}
                            animate={{
                              backgroundColor: hasVoted ? "#5944A6" : "#FFFFFF",
                            }}
                            transition={{ duration: 0.6 }}
                          >
                            <p style={{color: hasVoted ? "white" : "#5944A6" }} className="text-sm font-bold text-center">{user}</p>
                            {hasVoted && (
                              <GoVerified size={25} className="mt-1 text-white" />
                            )}
                            {!hasVoted && !votes && (
                              <span className="text-4xl text-[#5944A6]">?</span>
                            )}
                          </motion.div>

                          <div
                            className="absolute w-full h-full flex flex-col items-center justify-center rounded shadow text-sm border-2 bg-[#5944A6] text-white"
                            style={{
                              transform: "rotateY(180deg)",
                              backfaceVisibility: "hidden",
                            }}
                          >
                            <p className="text-sm mt-1 font-bold text-center">{user}</p>
                            <p className="text-4xl font-bold">{vote || "?"}</p>
                          </div>
                        </motion.div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </>
          )}
        </div>
        {
          joined && (
            <div className="fixed bottom-0 flex items-center">
              <div onClick={() => setShowUserModal(true)}>
                <MdAccountCircle size={60} color="#5944A6" className="mr-10 mb-4 cursor-pointer" />
              </div>
              <div className="flex flex-wrap gap-4 mb-4">
                {["1", "2", "3", "5", "8", "13", "21", "?", "☕️"].map((value) => (
                  <button
                    key={value}
                    onClick={() => submitVote(value)}
                    className={`w-[60px] h-[90px] rounded text-[20px] shadow-xs cursor-pointer text-white ${
                      card === value
                        ? "bg-[#5944A6]"
                        : "border-[#5944A6] hover:bg-[#5944A6] bg-[#8E79D9] hover:translate-y-[-10px] transition border-2"
                    }`}
                  >
                    {value}
                  </button>
                ))}
              </div>
            </div>
          )
        }
      </main>
      {showUserModal && (
        <div style={{backgroundColor: "rgba(0, 0, 0, 0.5)"}} className="fixed inset-0 flex justify-center items-center z-50">
          <div className="bg-[#F2EBDC] p-6 rounded shadow max-w-sm w-full relative">
            <button
              onClick={() => setShowUserModal(false)}
              className="absolute top-6 right-6 text-gray-600 hover:text-black cursor-pointer"
            >
              <RxCross1 size={20} />
            </button>
            <h2 className="text-lg font-bold mb-2 text-black">Usuário</h2>
            <p className="text-gray-800">Digite seu novo username</p>
            <input style={{borderColor: focusNewUsername ? '#DF0979' : undefined}} onFocus={() => setFocusNewUsername(true)} onBlur={() => setFocusNewUsername(false)} className="rounded w-full p-2 border-2 border-[#ECECEC] text-black outline-0" value={newUsername} onChange={e => setNewUsername(e.target.value)} />
            <button
              onClick={changeUsername}
              className="w-full text-white p-3 mt-4 cursor-pointer bg-[#DF0979] rounded">
              Novo username
            </button>
          </div>
        </div>
      )}

      {showInviteModal && (
        <div
          style={{backgroundColor: "rgba(0, 0, 0, 0.5)"}}
          className="fixed inset-0 flex justify-center items-center z-50"
        >
          <div className="bg-[#F2EBDC] p-6 px-8 rounded-2xl shadow w-[580px] h-[320px] relative flex items-center flex-col justify-center">
            <button
              onClick={() => setShowInviteModal(false)}
              className="absolute top-6 right-6 text-gray-600 hover:text-black cursor-pointer"
            >
              <RxCross1 size={20} />
            </button>
            <h2 className="text-2xl text-black font-bold self-start mb-10">Convide o pessoal</h2>
            <div style={{ borderColor: isFocused ? "#DF0979" : undefined }} className="p-2 border-2 rounded w-full mb-6 relative">
              <p className="absolute px-3 rounded-full text-[12px] text-white bg-[#DF0979] top-[-10px]">plannig poker url</p>
              <input onFocus={() => setIsFocused(true)} onBlur={() => setIsFocused(false)} className="w-full text-black mt-1 outline-0" value={window.location.href} readOnly />
            </div>
            <button
              onClick={copyLink}
              className="bg-[#DF0979] text-white py-3 w-full rounded hover:bg-[#BE0867] transition cursor-pointer"
            >
              Copiar link
            </button>
          </div>
        </div>
      )}
    </>
  );
}
