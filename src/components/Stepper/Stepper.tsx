import React from "react";
import { ProgressBar } from "../ProgressBar/ProgressBar";

interface StepperProps {
  currentStep: number;
}

const steps = [
  { number: 1, label: "Your info" },
  { number: 2, label: "User stories" },
  { number: 3, label: "Deck & settings" },
  { number: 4, label: "Review" },
];

const Stepper: React.FC<StepperProps> = ({ currentStep }) => {
  return (
    <div className="w-full">
      <div className="flex mb-5">
        {steps.map((step) => {
          const isActive = step.number === currentStep;
          const isCompleted = step.number < currentStep;

          return (
            <div
              key={step.number}
              className="flex gap-3 w-full justify-center"
            >
              <div className="flex gap-3">
                <div
                  className={`flex items-center justify-center w-8 h-8 rounded-full text-sm font-medium
                  ${
                    isActive
                      ? "bg-gray-900 text-white"
                      : isCompleted
                      ? "bg-gray-200 text-gray-700"
                      : "bg-gray-100 text-gray-500"
                  }`}
                >
                  {step.number}
                </div>

                <span
                  className={`mt-2 text-sm ${
                    isActive
                      ? "text-gray-900 font-medium"
                      : "text-gray-500"
                  }`}
                >
                  {step.label}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      <ProgressBar color="bg-black" value={((currentStep) / (steps.length)) * 100} />
    </div>
  );
};

export default Stepper;
