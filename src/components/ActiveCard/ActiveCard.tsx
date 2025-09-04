import { useState } from "react";
import { ToggleSwitch } from "../ToggleSwitch/ToggleSwitch";
import { Input } from "../Input/Input";

interface IActiveCardProps {
  title: string;
  description: string;
}

export const ActiveCard = ({
  description,
  title,
}: IActiveCardProps) => {
  const [switchIsActive, setSwitchIsActive] = useState<boolean>(false);
  const [timer, setTimer] = useState<string>('');

  return (
    <div className={`w-full border p-4 mb-4 rounded-lg border-gray-900 ${switchIsActive && 'bg-gray-100'}`}>
      <div className="flex w-full items-center justify-between">
        <div>
          <p>{title}</p>
          <p className="text-xs">{description}</p>
        </div>
        <ToggleSwitch enabled={switchIsActive} setEnabled={setSwitchIsActive} />
      </div>
      <div className="mt-3 flex items-center gap-4">
        <Input value={timer} setValue={setTimer} size={8} placeholder="60" readOnly={!!!switchIsActive} />
        <p className="text-sm text-gray-700">seconds</p>
      </div>
    </div>
  )
}