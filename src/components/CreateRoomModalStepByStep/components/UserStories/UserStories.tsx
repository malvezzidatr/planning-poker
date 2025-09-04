import { Button } from "@/components/Button/Button";
import Icon from "@/components/Icon/Icon";
import { Input } from "@/components/Input/Input"
import React, { SetStateAction, useRef, useState } from "react"

interface IUserStories {
  setUserStories: React.Dispatch<SetStateAction<string[]>>;
  userStories: string[];
}

export const UserStories = ({
  setUserStories,
  userStories,
}: IUserStories) => {
  const [newUserStories, setNewUserStories] = useState<string>("");
    const inputRef = useRef<HTMLInputElement>(null);
  
  const addNewUserStories = () => {
    if (newUserStories) {
      setUserStories(prev => [...prev, newUserStories ]);
      setNewUserStories("");
      inputRef.current?.focus();
    }
  }

  const handleRemoveStory = (index: number) => {
    setUserStories(prev => prev.filter((_, i) => i !== index));
  }

  return (
    <div className="px-6 overflow-y-auto">
      <div className="flex gap-6 items-end">
        <Input ref={inputRef} placeholder="As a user, I want to..." labelText="Add User Story" full setValue={setNewUserStories} value={newUserStories} />
        <Button onClick={addNewUserStories} text="Add Story" iconName="plus" />
      </div>
      <div className="mt-10">
        <div className="w-full flex items-end justify-between mb-3">
          <p>Added Stories</p>
          <p className="text-gray-500 text-xs">{userStories.length} stories</p>
        </div>
        <div className="p-2 border-[1px] mb-10 border-gray-300 rounded-lg flex flex-col gap-3">
          {userStories.length > 0 ? (
            userStories.map((storie, index) => (
              <div key={storie + index} className="flex gap-4">
                <Input readOnly value={storie} full setValue={() => {}} />
                <button onClick={() => handleRemoveStory(index)} className="rounded-full flex justify-center items-center h-11 w-11 hover:bg-gray-300 transitio cursor-pointer">
                  <Icon name="trash" size={16} color="#9CA3AF" />
                </button>
              </div>
            ))
          ) : (
            <div className="w-full flex flex-col items-center gap-2 p-6 justify-center">
              <Icon name="infoCircle" />
              <p>Any stories has been added at this moment</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}