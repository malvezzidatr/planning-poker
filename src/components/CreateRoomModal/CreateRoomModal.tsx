import { useState } from "react";
import Icon from "../Icon/Icon"
import { Input } from "../Input/Input";
import { UserRoleCard } from "../UserRoleCard/UserRoleCard";
import { Button } from "../Button/Button";
import { VotingCardType } from "../VotingCardType/VotingCardType";

interface ICreateRoomModal {
  headerTitle: string;
  headerDescription?: string;
  isOpen: boolean;
  onClose: () => void;
  handlePress: (username: string) => void;
}

export const CreateRoomModal = ({
  headerTitle,
  headerDescription,
  isOpen,
  onClose,
  handlePress
}: ICreateRoomModal) => {
  const [name, setName] = useState("");
  const [roomName, setRoomName] = useState("");
  const [isPlayer, setIsPlayer] = useState(true);

  const handleRoleChange = (role: "player" | "spectator") => {
    setIsPlayer(role === "player");
  };

  return (
    <div
      style={{backgroundColor: "rgba(0, 0, 0, 0.5)", display: isOpen ? "flex" : "none"}}
      className="fixed inset-0 flex flex-col justify-center items-center z-50"
    >
      <div className="bg-white text-black p-6 rounded-lg shadow-lg w-[700px]">
        <div className="mb-10">
          <div className="flex items-center justify-between">
            <p className="text-2xl font-bold">{headerTitle}</p>
            <div onClick={onClose}>
              <Icon className="cursor-pointer hover:opacity-60 transition" name="close" color="#000" />
            </div>
          </div>
          <p>{headerDescription}</p>
        </div>
        <div>
          <div className="mb-6 flex gap-4">
            <Input value={name} setValue={setName} labelText="Your Name *" placeholder="Enter your name" full />
            {/* <Input value={roomName} setValue={setRoomName} labelText="Room Name (optional)" placeholder="Sprint planning session" full /> */}
          </div>
          <div className="mt-6 flex flex-col gap-4">
            <p className="text-md text-black">Voting Cards Type *</p>
            <VotingCardType type="Fibonacci" description="Classic agile estimation" />
          </div>
          <div className="mt-6 flex flex-col gap-4">
            <p className="text-md text-black">Your role *</p>
            <div className="flex gap-4">
              <UserRoleCard onPress={() => handleRoleChange("player")} active={isPlayer} type="Player" description="Vote on estimates" iconName="user" />
              {/* <UserRoleCard onPress={() => handleRoleChange("spectator")} active={!isPlayer} type="Spectator" description="Watch only" iconName="eye" /> */}
            </div>
          </div>
        </div>
        <div className="flex justify-between mt-6 gap-4">
          <Button full text="Cancel" onClick={onClose} />
          <Button full text="Create Room" iconName="plus" onClick={() => handlePress(name)} />
        </div>
      </div>
    </div>
  )
}