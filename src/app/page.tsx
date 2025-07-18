"use client"
import { useState } from "react";
import { useRouter } from "next/navigation";
import { v4 as uuid } from "uuid";
import { IoMdInformationCircleOutline } from "react-icons/io";
import Header from "@/components/Header/Header";

export default function Home() {
  const router = useRouter();
  const [roomInput, setRoomInput] = useState("");

  const createRoom = () => {
    const newRoomId = uuid().slice(0, 6);
    router.push(`/room/${newRoomId}`);
  };

  const joinRoom = () => {
    if (roomInput.trim()) {
      router.push(`/room/${roomInput.trim()}`);
    }
  };

  return (
    <div className="min-h-screen bg-gray-300 flex items-center justify-center p-6">
      <Header />
      <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full text-center">
        <h1 className="text-3xl font-bold text-primary mb-6 text-black">Planning Poker</h1>

        <button
          onClick={createRoom}
          className="bg-[#DF0979] bg-primary text-white w-full py-3 rounded hover:bg-[#BE0867] cursor-pointer transition mb-4"
        >
          Criar nova sala
        </button>

        <div className="relative mb-2">
          <input
            type="text"
            placeholder="Código da sala"
            className="w-full border border-gray-300 rounded py-2 px-4 placeholder-gray-600 text-gray-800"
            value={roomInput}
            onChange={(e) => setRoomInput(e.target.value)}
          />
        </div>
        <button
          onClick={joinRoom}
          className="bg-[#242F66] text-white w-full py-3 rounded hover:bg-[#151F4F] cursor-pointer transition"
        >
          Entrar em sala existente
        </button>
      </div>
      <div onClick={() => router.push('/terms')} className="cursor-pointer absolute bottom-6 left-6 text-gray-600 gap-2 flex items-center">
        <IoMdInformationCircleOutline />
        <p>Termos e condições</p>
      </div>
      <p className="text-gray-600 absolute right-6 bottom-6">Desenvolvido por Caio Malvezzi</p>
    </div>
  );
}
