import Icon, { IconName } from "../Icon/Icon"

interface IUserTypeCardProps {
  iconName: IconName;
  type: string;
  description: string;
  active?: boolean;
  onPress?: () => void;
  testID?: string;
}

export const UserRoleCard = ({
  testID,
  iconName,
  type,
  description,
  active = false,
  onPress = () => {},
}: IUserTypeCardProps) => {
  return (
    <div data-active={active} data-testid={testID} className={`transition cursor-pointer w-full h-[140px] ${active && "text-white"} border-[1px] border-black rounded-lg bg-[#F9FAFB] flex flex-col items-center justify-center ${active ? "border-gray-900 bg-gray-800" : ""}`} onClick={onPress}>
      <Icon color={``} name={iconName} />
      <p className={`text-lg`}>{type}</p>
      <p className={`text-sm`}>{description}</p>
    </div>
  )
}