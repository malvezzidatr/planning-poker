"use client"

import { useState } from "react"
import Stepper from "../Stepper/Stepper"
import { Button } from "../Button/Button";
import { YourInfo } from "./components/YourInfo/YourInfo";
import { UserStories } from "./components/UserStories/UserStories";
import { DeckAndSettings } from "./components/DeckAndSettings/DeckAndSettings";
import { Review } from "./components/Review/Review";

interface ICreateRoomModalStepByStepProps {
  closeModal: () => void;
  isOpen: boolean;
}

export const CreateRoomModalStepByStep = ({
  closeModal,
  isOpen
}: ICreateRoomModalStepByStepProps) => {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [userStories, setUserStories] = useState<string[]>([]);
  const [name, setName] = useState<string>('');

  if (!isOpen) return
  
  const nextStep = () => {
    setCurrentStep(prevState => prevState + 1);
  }

  const previousStep = () => {
    setCurrentStep(prevState => prevState - 1);
  }

  return (
    <div
      style={{backgroundColor: "rgba(0, 0, 0, 0.5)"}}
      className="fixed inset-0 flex-col justify-center items-center z-50 flex"
      onClick={closeModal}
    >
      <div onClick={e => e.stopPropagation()} className="bg-white relative text-black rounded-lg shadow-lg flex h-[650px] overflow-y-hidden flex-col w-[750px]">
        <h4 className="sticky text-xl p-6 border-b-[1px] border-gray-300">Create a new room</h4>
        <div className="sticky mt-2 p-6 w-full">
          <Stepper currentStep={currentStep} />
        </div>
        {
          currentStep === 1 && (
            <YourInfo setName={setName} name={name} />
          )
        }
        {
          currentStep === 2 && (
            <UserStories />
          )
        }
        {
          currentStep === 3 && (
            <DeckAndSettings />
          )
        }
        {
          currentStep === 4 && (
            <Review />
          )
        }
        <div className="flex sticky border-t-[1px] border-t-gray-300 pt-6 bottom-5 bg-white w-full justify-between px-6">
          <button className="text-gray-600 p-2 hover:text-black transition-all text-sm cursor-pointer" onClick={closeModal}>
            Cancel
          </button>
          <div className="flex gap-4">
            {currentStep !== 1 && (
              <Button onClick={previousStep} variant="secondary" text="Back" />
            )}
            <Button onClick={nextStep} text={currentStep === 4 ? "Create Room" : "Next"} />
          </div>
        </div>
      </div>
    </div>
  )
}