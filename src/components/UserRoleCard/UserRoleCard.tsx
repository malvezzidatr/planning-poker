import Icon, { IconName } from "../Icon/Icon"

interface IUserTypeCardProps {
  iconName: IconName;
  type: string;
  description: string;
  active?: boolean;
  onPress?: () => void;
}

export const UserRoleCard = ({
  iconName,
  type,
  description,
  active = false,
  onPress = () => {},
}: IUserTypeCardProps) => {
  return (
    <div className={`transition cursor-pointer w-full h-[140px] border-2 border-[#E4E7EB] rounded-lg bg-[#F9FAFB] flex flex-col items-center justify-center ${active ? "border-blue-500 bg-blue-50" : ""}`} onClick={onPress}>
      <Icon color={`${active ? '#3B82F6' : '#6A7280'}`} name={iconName} />
      <p className={`${active ? "text-blue-500" : "text-[#374151]"}  text-lg`}>{type}</p>
      <p className={`${active ? "text-blue-500" : "text-[#6A7280]"} text-sm`}>{description}</p>
    </div>
  )
}