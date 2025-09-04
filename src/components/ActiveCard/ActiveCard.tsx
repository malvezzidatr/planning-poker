import { SetStateAction, useState } from "react";
import { ToggleSwitch } from "../ToggleSwitch/ToggleSwitch";
import { Input } from "../Input/Input";

interface IActiveCardProps {
  title: string;
  description: string;
  onActive: () => void;
  active: boolean;
  timer?: string;
  setTimer?: React.Dispatch<SetStateAction<string>>;
}

export const ActiveCard = ({
  description,
  title,
  onActive,
  active,
  timer,
  setTimer,
}: IActiveCardProps) => {
  return (
    <div className={`w-full border p-4 mb-4 rounded-lg border-gray-900 ${active && "bg-gray-100"}`}>
      <div className="flex w-full items-center justify-between">
        <div>
          <p>{title}</p>
          <p className="text-xs">{description}</p>
        </div>
        <ToggleSwitch enabled={active} setEnabled={onActive} />
      </div>
      <div className="mt-3 flex items-center gap-4">
        <Input
          value={timer || ""}
          setValue={setTimer ?? (() => {})}
          size={8}
          placeholder="60"
          readOnly={!active}
        />
        <p className="text-sm text-gray-700">seconds</p>
      </div>
    </div>
  )
}