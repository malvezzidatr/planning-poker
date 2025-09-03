"use client"

import { useState } from "react"
import Stepper from "../Stepper/Stepper"
import { Button } from "../Button/Button";

export const CreateRoomModalStepByStep = () => {
  const [currentStep, setCurrentStep] = useState<number>(1);

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
    >
      <div className="bg-white relative text-black rounded-lg shadow-lg flex flex-col overflow-scroll h-[600px] w-[750px]">
        <h4 className="text-xl p-6 border-b-[1px] border-gray-300">Create a new room</h4>
        <div className="mt-2 p-6 w-full">
          <Stepper currentStep={currentStep} />
        </div>
        <div className="flex sticky bottom-0 bg-white w-full justify-end gap-4 px-6">
          {currentStep !== 1 && (
            <Button onClick={previousStep} outlined variant="secondary" text="Back" />
          )}
          <Button onClick={nextStep} outlined text="Next" />
        </div>
      </div>
    </div>
  )
}