"use client"

import { useRouter } from "next/navigation";
import { JoinSessionCard } from "../JoinSessionCard/JoinSessionCard"
import { useState } from "react";
import { CreateRoomModal } from "../CreateRoomModal/CreateRoomModal";
import { v4 as uuid } from "uuid";
import { Alert } from "../Alert/Alert";
import { AnimatePresence } from "framer-motion";
import socket from "@/lib/socket";

export const JoinSessionCardGroup = () => {
  const [roomCode, setRoomCode] = useState<string>("");
  const [isCreateRoomModalOpen, setIsCreateRoomModalOpen] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const router = useRouter();

  const joinRoom = async () => {
    if (!roomCode.trim()) {
      setErrorMessage("Please enter a room code.");
      return;
    }

    const exists = await checkIfRoomExists(roomCode.trim());
    if (exists) {
      router.push(`/room/${roomCode.trim()}`);
    } else {
      setErrorMessage("Please enter a valid room code.");
    }
  };

  const checkIfRoomExists = (roomId: string): Promise<boolean> => {
    return new Promise((resolve) => {
      socket.emit("checkIfRoomExists", { roomId });
      socket.once("checkIfRoomExistsResponse", ({ exists }) => {
        console.log(exists)
        resolve(exists);
      });
    });
  };

  const createRoom = (username: string, role: 'player' | 'spectator') => {
    const newRoomId = uuid().slice(0, 6);
    router.push(`/room/${newRoomId}`);
    localStorage.setItem("username", username);
    localStorage.setItem("room", newRoomId);
    localStorage.setItem("role", role);
  };

  return (
    <>
      <AnimatePresence>
        {errorMessage && <Alert type="warning" iconName="attention" text={errorMessage} closable onClose={() => setErrorMessage("")} />}
      </AnimatePresence>
      <div className="flex flex-row gap-5 mt-5">
        <JoinSessionCard buttonBackgroundColor="blue" primaryColor="blue" buttonIconName="plus" onClick={() => setIsCreateRoomModalOpen(true)} iconName="plus" description="Create a new room and invite your team to estimate together." title="Start New Session" buttonText="Create Room" />
        <JoinSessionCard buttonBackgroundColor="green" primaryColor="green" buttonIconName="handTogether" onClick={joinRoom} iconName="groupOfUsers" description="Have a room code? Join your team's estimation session." title="Join Existing Room" buttonText="Join Room" input={{ value: roomCode, setValue: setRoomCode }} />
      </div>
      <CreateRoomModal
        onClose={() => setIsCreateRoomModalOpen(false)}
        isOpen={isCreateRoomModalOpen}
        headerTitle="Create Room"
        headerDescription="Set up your planning session and invite your team"
        handlePress={createRoom}
      />
    </>
  )
}