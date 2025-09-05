"use client";

import { SetStateAction } from "react";

interface IToggleSwitchProps {
  enabled: boolean;
  setEnabled: React.Dispatch<SetStateAction<boolean>>;
}

export const ToggleSwitch = ({
  enabled,
  setEnabled
}: IToggleSwitchProps) => {
  return (
    <button
      onClick={() => setEnabled(!enabled)}
      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-300 cursor-pointer ${
        enabled ? "bg-gray-900" : "bg-gray-300"
      }`}
    >
      <span
        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-300 ${
          enabled ? "translate-x-6" : "translate-x-1"
        }`}
      />
    </button>
  );
}
