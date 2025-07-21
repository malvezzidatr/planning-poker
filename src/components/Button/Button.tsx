import Icon, { IconName } from "../Icon/Icon"

interface IButtonProps {
  onClick: () => void;
  text: string;
  iconName?: IconName;
  full?: boolean
}

export const Button = ({
  onClick,
  text,
  iconName,
  full,
}: IButtonProps) => {
  return (
    <button className={`bg-[#0067DA] flex items-center py-3 px-6 rounded-lg cursor-pointer hover:bg-[#0056B3] transition-colors text-white ${full ? "w-full" : ""}`} onClick={onClick}>
      {iconName && <Icon size={14} name={iconName} color="#FFF" />}
      <p className="ml-2">{text}</p>
    </button>
  )
}