import Icon, { IconName } from "../Icon/Icon"

interface IAlertProps {
  text: string;
  iconName?: IconName;
}

export const Alert = ({
  text,
  iconName,
}: IAlertProps) => {
  return (
    <div className="w-full rounded-lg bg-gray-300 items-center shadow-sm p-3 flex gap-3">
      {iconName && (
        <Icon size={16} name={iconName} />
      )}
      <p>{text}</p>
    </div>
  )
}