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
import { HelpfulCard } from "@/components/HelpfulCard/HelpfulCard";
import { Footer } from "@/components/Footer/footer";
import { JoinSessionCard } from "@/components/JoinSessionCard/JoinSessionCard";

export default function Home() {
  const router = useRouter();
  const [isCreateRoomModalOpen, setIsCreateRoomModalOpen] = useState(false);
  const [isJoinRoomModalOpen, setIsJoinRoomModalOpen] = useState(false);
  const [roomCode, setRoomCode] = useState("");

  const createRoom = (username: string, role: 'player' | 'spectator') => {
    const newRoomId = uuid().slice(0, 6);
    router.push(`/room/${newRoomId}`);
    localStorage.setItem("username", username);
    localStorage.setItem("room", newRoomId);
    localStorage.setItem("role", role);
  };

  const joinRoom = () => {
    router.push(`/room/${roomCode.trim()}`);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      if (roomCode.trim()) {
        joinRoom();
      }
    }
  };
  
  return (
    <div className="min-h-screen bg-[#F3F8FE] flex flex-col">
      <Header />
      <div className="bg-[#F3F8FE] px-24 py-24 mt-12 flex items-center justify-between w-full">
        <div className="w-1/2">
          <h1 className="text-[#004593] font-bold text-5xl mb-4">Estimate tasks with your team, simplified</h1>
          <p className="text-[#4B5563] text-xl w-11/12">Planning Poker is a consenseus-based estimation technique for agile teams. Estimate effort or relative size of user stories in a fun, effective way.</p>
          <div className="flex flex-row gap-5 mt-5">
            <JoinSessionCard buttonBackgroundColor="blue" primaryColor="blue" buttonIconName="plus" onClick={() => setIsCreateRoomModalOpen(true)} iconName="plus" description="Create a new room and invite your team to estimate together." title="Start New Session" buttonText="Create Room" />
            <JoinSessionCard buttonBackgroundColor="green" primaryColor="green" buttonIconName="handTogether" onClick={joinRoom} iconName="groupOfUsers" description="Have a room code? Join your team's estimation session." title="Join Existing Room" buttonText="Join Room" input={{ value: roomCode, setValue: setRoomCode }} />
          </div>
        </div>
        <Image width={450} height={450} alt="teste" src={'/Image_home.png'} />
      </div>
      <div className="flex flex-col w-full justify-center items-center text-black">
        <p className="text-3xl font-bold mb-10">How it works</p>
        <div className="flex items-center gap-2 justify-between w-full px-24 mb-14">
          <HelpfulCard iconName="groupOfUsers" title="Create a Room" description="Start a new estimation session and invite your teams members to join using a unique room code." />
          <HelpfulCard iconName="handTogether" title="Vote Together" description="Everyone selects a card representing their estimate. Votes remain hidden until revealed." />
          <HelpfulCard iconName="chartPie" title="Reach Consensus" description="Discuss differences in estimates and revote until the teams reaches a consensus." />
        </div>
      </div>
      <Footer />
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
