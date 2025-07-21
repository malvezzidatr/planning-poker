"use client"
import { useState } from "react";
import { useRouter } from "next/navigation";
import { v4 as uuid } from "uuid";
import Header from "@/components/Header/Header";
import Image from "next/image";
import { Button } from "@/components/Button/Button";
import { Input } from "@/components/Input/Input";
import { JoinRoomModal } from "@/components/JoinRoomModal/JoinRoomModal";
import { CreateRoomModal } from "@/components/CreateRoomModal/CreateRoomModal";
import socket from "@/lib/socket";

export default function Home() {
  const router = useRouter();
  const [roomInput, setRoomInput] = useState("");
  const [isCreateRoomModalOpen, setIsCreateRoomModalOpen] = useState(false);
  const [isJoinRoomModalOpen, setIsJoinRoomModalOpen] = useState(false);
  const [roomCode, setRoomCode] = useState("");

  const createRoom = (username: string) => {
    const newRoomId = uuid().slice(0, 6);
    router.push(`/room/${newRoomId}`);
    localStorage.setItem("username", username);
  };

  const joinRoom = (username: string) => {
    socket.emit("joinRoom", { roomId: roomCode.trim(), username });
    router.push(`/room/${roomCode.trim()}`);
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      if (roomCode.trim()) {
        setIsJoinRoomModalOpen(true);
      }
    }
  };
  
  return (
    <div className="min-h-screen bg-gray-300 flex">
      <Header />
      <div className="bg-[#F3F8FE] px-24 flex items-center justify-between w-full">
        <div className="w-1/2">
          <h1 className="text-[#004593] font-bold text-5xl mb-4">Estimate tasks with your team, simplified</h1>
          <p className="text-[#4B5563] text-xl w-11/12">Planning Poker is a consenseus-based estimation technique for agile teams. Estimate effort or relative size of user stories in a fun, effective way.</p>
          <div className="mt-8 flex gap-5">
            <Button full onClick={() => setIsCreateRoomModalOpen(true)} text="Create New Room" iconName="plus" />
            <Input onKeyDown={handleKeyDown} value={roomCode} setValue={setRoomCode} placeholder="Enter room code" />
          </div>
        </div>
        <Image width={450} height={450} alt="teste" src={'/Image_home.png'} />
      </div>
      <JoinRoomModal
        onClose={() => setIsJoinRoomModalOpen(false)}
        isOpen={isJoinRoomModalOpen}
        headerTitle="Join Room"
        headerDescription="Please provide your details to join the session."
        handlePress={joinRoom}
      />
      <CreateRoomModal
        onClose={() => setIsCreateRoomModalOpen(false)}
        isOpen={isCreateRoomModalOpen}
        headerTitle="Create Room"
        headerDescription="Set up your planning session and invite your team"
        handlePress={createRoom}
      />
    </div>
  );
}
