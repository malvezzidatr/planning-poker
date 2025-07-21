"use client";

import { useRouter, useParams } from "next/navigation";
import { useEffect, useLayoutEffect, useState } from "react";
import socket from "../../../lib/socket";
import { motion } from "framer-motion";
import { GoVerified } from "react-icons/go";
import { RxCross1 } from "react-icons/rx";
import Header from "@/components/Header/Header";
import { MdAccountCircle } from "react-icons/md";
import { Button } from "@/components/Button/Button";
import { UserCard } from "@/components/UserCard/UserCard";
import { UserCardVotes } from "@/components/UserCardVotes/UserCardVotes";
import { Card } from "@/components/Card/Card";
import { ProgressBar } from "@/components/ProgressBar/ProgressBar";

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

  useLayoutEffect(() => {
    const storedUsername = localStorage.getItem("username");
    if (storedUsername) {
      setUsername(storedUsername);
      socket.emit("joinRoom", { roomId, username: storedUsername });
    }

    setIsLoading(false);
  }, [])

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
      <div className="min-h-screen bg-[#F9FAFB] px-24 flex">
        <div className="w-full mx-auto mt-28 text-black rounded-lg shadow-xs">
          <div className="bg-white p-6 rounded-lg shadow-md flex justify-between items-center">
            <p className="font-bold text-2xl">Room: <span className="text-blue-500 font-bold">{roomId}</span></p> 
            <Button onClick={copyLink} text="Copy Link" iconName="copy" />
          </div>
          <div className="flex gap-8 mt-6">
            <div className="flex-col">
              <div className="p-6 bg-white rounded-lg shadow-md w-[300px] flex flex-col gap-4">
                <p className="font-bold">Players ({users.length})</p>
                {users.map((user, index) => {
                  return (
                    <UserCard key={index} username={user} isCurrentUser={user === username} />
                  );
                })}
              </div>
            </div>
            <div className="flex-col w-full">
              <div className="bg-white w-full rounded-lg shadow-sm p-6">
                <p>Individual Votes</p>
                <div className="grid grid-cols-3 gap-4 mt-4">
                  {users.map((user, index) => {
                    return (
                      <UserCardVotes
                        key={index}
                        isCurrentUser={user === username}
                        username={user}
                        vote={votes ? votes[user] : undefined}
                      />
                    )}
                  )}
                </div>
              </div>
              <div className="bg-white w-full rounded-lg shadow-sm p-6 mt-8">
                <div className="flex justify-between items-center mb-4">
                  <p>Voting session</p>
                  <p><span className="text-green-500">{votedUsers.size} </span>of {users.length} voted</p>
                </div>
                <ProgressBar value={(votedUsers.size / users.length) * 100} color="bg-green-500" />
              </div>
              <div className="bg-white w-full rounded-lg shadow-sm p-6 mt-8">
                <p>Select Vote</p>
                <div className="flex gap-4 mt-4">
                  {["1", "2", "3", "5", "8", "13", "21", "?"].map((value) => (
                    <Card selectedCard={card} value={value} key={value} onClick={() => submitVote(value)} />
                  ))}
                </div>
              </div>
              <div className="bg-white w-full rounded-lg shadow-sm p-6 mt-8 flex gap-8">
                <Button
                  text="Reveal Votes"
                  onClick={revealVotes}
                  iconName="eye"
                />
                <Button
                  text="Reset Votes"
                  onClick={resetVotes}
                  iconName="refresh"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
