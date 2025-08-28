import { useRef, useState } from "react";
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
  handlePress: (username: string, role: 'player' | 'spectator', userStories: { description: string }[]) => void;
}

export const CreateRoomModal = ({
  headerTitle,
  headerDescription,
  isOpen,
  onClose,
  handlePress
}: ICreateRoomModal) => {
  const [name, setName] = useState("");
  const [userStories, setUserStories] = useState<{ description: string }[]>([])
  const [userStoriesValue, setUserStoriesValue] = useState<string>("");
  const [roomName, setRoomName] = useState("");
  const [isPlayer, setIsPlayer] = useState(true);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleRoleChange = (role: "player" | "spectator") => {
    setIsPlayer(role === "player");
  };

  if (!isOpen) return null;

  const handleAddStory = () => {
    setUserStories(prev => [...prev, { description: userStoriesValue }]);
    handleClearFocusStory();
    inputRef.current?.focus();
  }

  const handleRemoveStory = (index: number) => {
    setUserStories(prev => prev.filter((_, i) => i !== index));
  }

  const handleClearFocusStory = () => {
    setUserStoriesValue("");
  }

  return (
    <div
      style={{backgroundColor: "rgba(0, 0, 0, 0.5)"}}
      className="fixed inset-0 flex-col justify-center items-center z-50 flex"
    >
      <div className="bg-white text-black p-6 rounded-lg shadow-lg overflow-scroll h-[700px] w-[750px]">
        <div className="mb-10">
          <div className="flex items-center justify-between">
            <p className="text-2xl font-bold">{headerTitle}</p>
            <div onClick={onClose}>
              <Icon testID="icon-close" className="cursor-pointer hover:opacity-60 transition" name="close" color="#000" />
            </div>
          </div>
          <p>{headerDescription}</p>
        </div>
        <div>
          <div className="mb-6 flex gap-4">
            <Input value={name} setValue={setName} labelText="Your Name *" placeholder="Enter your name" full />
            {/* <Input value={roomName} setValue={setRoomName} labelText="Room Name (optional)" placeholder="Sprint planning session" full /> */}
          </div>
          <div className="mt-6">
            <div className="flex items-center justify-between w-full">
              <p>User stories</p>
              <button onClick={handleAddStory} className="flex gap-2 items-center cursor-pointer hover:opacity-75 transition">
                <Icon name="plus" size={16} color={"#155dfc"} />
                <p className="text-md text-blue-600">Add Story</p>
              </button>
            </div>
            <div className="w-full mt-2 bg-[#F9FAFB] px-3 py-2 rounded-lg flex items-center gap-4">
              <div className="flex w-full gap-4">
                <Input ref={inputRef} placeholder="As I user, I want to" full value={userStoriesValue} setValue={setUserStoriesValue} />
                <button onClick={handleClearFocusStory} className="rounded-full px-3 hover:bg-gray-300 transitio cursor-pointer">
                  <Icon name="trash" size={16} color="#9CA3AF" />
                </button>
              </div>
            </div>
            <p className="mt-2 mb-4 text-sm text-gray-500">Add stories you want to estimate in this session</p>
          </div>
          {userStories.map((item, index) => (
            <div key={item.description + index} className="w-full mt-2 bg-[#F9FAFB] px-3 py-2 rounded-lg flex items-center gap-4">
              <Input readOnly value={item.description} full setValue={() => {}} />
              <button onClick={() => handleRemoveStory(index)} className="rounded-full p-2 hover:bg-gray-300 transitio cursor-pointer">
                <Icon name="trash" size={16} color="#9CA3AF" />
              </button>
            </div>
          ))}
          <div className="mt-6 flex flex-col gap-4">
            <p className="text-md text-black">Voting Cards Type *</p>
            <VotingCardType testID={"voting-card-type"} type="Fibonacci" description="Classic agile estimation" />
          </div>
          <div className="mt-6 flex flex-col gap-4">
            <p className="text-md text-black">Your role *</p>
            <div className="flex gap-4">
              <UserRoleCard testID="role-card-player" onPress={() => handleRoleChange("player")} active={isPlayer} type="Player" description="Vote on estimates" iconName="user" />
              <UserRoleCard testID="role-card-spectator" onPress={() => handleRoleChange("spectator")} active={!isPlayer} type="Spectator" description="Watch only" iconName="eye" />
            </div>
          </div>
        </div>
        <div className="flex justify-between mt-6 gap-4">
          <Button variant="secondary" textCenter full text="Cancel" onClick={onClose} />
          <Button full text="Create Room" textCenter iconName="plus" onClick={() => handlePress(name, isPlayer ? 'player' : 'spectator', userStories)} />
        </div>
      </div>
    </div>
  )
}