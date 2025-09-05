import { Button } from "../Button/Button";
import Icon, { IconName } from "../Icon/Icon"
import { Input } from "../Input/Input";

interface JoinSessionCardProps {
  onClick: () => void;
  iconName: IconName;
  title: string;
  description: string;
  buttonText: string;
  input?: {
    value: string;
    setValue: React.Dispatch<React.SetStateAction<string>>;
  },
  buttonIconName: IconName;
  buttonBackgroundColor?: 'blue' | 'green' | 'red' | 'none';
  primaryColor?: 'blue' | 'green';
}

export const JoinSessionCard = ({
  onClick,
  iconName,
  title,
  description,
  buttonText,
  input,
  primaryColor,
  buttonIconName,
  buttonBackgroundColor = 'none',
}: JoinSessionCardProps) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm flex flex-col items-center lg:w-[280px]">
      <div className="flex items-center gap-2 w-full">
        <div className={`p-3 rounded-lg ${primaryColor ? 'bg-green-200' : 'bg-gray-900'}`}>
          <Icon size={16} name={iconName} color={primaryColor ? "#10B981" : "white"} />
        </div>
        <h2 className="text-black font-bold lg:text-lg text-sm">{title}</h2>
      </div>
      <p className="text-black text-sm my-4">{description}</p>
      {input && (
        <div className="mb-3 w-full">
          <Input full onClickIcon={() => {}} value={input.value} setValue={input.setValue} placeholder="Enter room code" />
        </div>
      )}
      <Button backgroundColor={buttonBackgroundColor} full onClick={onClick} text={buttonText} iconName={buttonIconName} />
    </div>
  )
}