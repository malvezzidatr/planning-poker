import { useState } from "react";
import Icon from "../Icon/Icon"
import { Input } from "../Input/Input";
import { UserRoleCard } from "../UserRoleCard/UserRoleCard";
import { Button } from "../Button/Button";

interface IModalProps {
  headerTitle: string;
  headerDescription?: string;
  isOpen: boolean;
  onClose: () => void;
  handlePress: (username: string, role: 'player' | 'spectator') => void;
  handleCancel?: () => void;
}

export const JoinRoomModal = ({
  headerTitle,
  headerDescription,
  isOpen,
  onClose,
  handlePress,
  handleCancel,
}: IModalProps) => {
  const [name, setName] = useState("");
  const [isPlayer, setIsPlayer] = useState(true);
  

  const handleRoleChange = (role: "player" | "spectator") => {
    setIsPlayer(role === "player");
  };

  return (
    <div
      style={{backgroundColor: "rgba(0, 0, 0, 0.5)", display: isOpen ? "flex" : "none"}}
      className="fixed inset-0 flex flex-col justify-center items-center z-50"
    >
      <div className="bg-white text-black p-6 rounded-lg shadow-lg w-[500px]">
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
          <Input value={name} setValue={setName} labelText="Your Name *" placeholder="Enter your name" full />
          <div className="mt-6 flex flex-col gap-4">
            <p className="text-md text-black">Role *</p>
            <div className="flex gap-4">
              <UserRoleCard onPress={() => handleRoleChange("player")} active={isPlayer} type="Player" description="Vote on estimates" iconName="user" />
              <UserRoleCard onPress={() => handleRoleChange("spectator")} active={!isPlayer} type="Spectator" description="Watch only" iconName="eye" />
            </div>
          </div>
        </div>
        <div className="flex justify-between mt-6 gap-4">
          <Button variant="secondary" full text="Cancel" onClick={handleCancel ?? onClose} />
          <Button full text="Join Room" iconName="arrowRight" onClick={() => handlePress(name, isPlayer ? 'player' : 'spectator')} />
        </div>
      </div>
    </div>
  )
}