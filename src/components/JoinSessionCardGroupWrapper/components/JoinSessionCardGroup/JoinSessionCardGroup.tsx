"use client"

import { useRouter } from "next/navigation";
import { JoinSessionCard } from "../../../JoinSessionCard/JoinSessionCard"
import { useEffect, useState } from "react";
import { Toast } from "../../../Toast/Toast";
import { AnimatePresence } from "framer-motion";
import { getSocket } from "@/lib/socket";
import { CreateRoomModalStepByStep } from "../../../CreateRoomModalStepByStep/CreateRoomModalStepByStep";
import { Socket } from "socket.io-client";

const JoinSessionCardGroup = () => {
  const [roomCode, setRoomCode] = useState<string>("");
  const [isCreateRoomModalOpen, setIsCreateRoomModalOpen] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [socket, setSocket] = useState<Socket | null>(null);
  const router = useRouter();

  useEffect(() => {
    const s = getSocket();
    setSocket(s);
  }, []);

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
      socket?.emit("checkIfRoomExists", { roomId });
      socket?.once("checkIfRoomExistsResponse", ({ exists }: { exists: boolean }) => {
        resolve(exists);
      });
    });
  };

  return (
    <>
      <AnimatePresence>
        {errorMessage && <Toast type="warning" iconName="attention" text={errorMessage} closable onClose={() => setErrorMessage("")} />}
      </AnimatePresence>
      <div className="flex lg:flex-row gap-5 mt-5 flex-col">
        <JoinSessionCard buttonIconName="plus" onClick={() => setIsCreateRoomModalOpen(true)} iconName="plus" description="Create a new room and invite your team to estimate together." title="Start New Session" buttonText="Create Room" />
        <JoinSessionCard buttonBackgroundColor="green" primaryColor="green" buttonIconName="handTogether" onClick={joinRoom} iconName="groupOfUsers" description="Have a room code? Join your team's estimation session." title="Join Existing Room" buttonText="Join Room" input={{ value: roomCode, setValue: setRoomCode }} />
      </div>
      <CreateRoomModalStepByStep isOpen={isCreateRoomModalOpen} closeModal={() => setIsCreateRoomModalOpen(false)} />
    </>
  )
}

export default JoinSessionCardGroup;