import Icon, { IconName } from "../Icon/Icon"

interface IHelpfulCardProps {
  iconName: IconName;
  title: string;
  description: string;
}

export const HelpfulCard = ({
  iconName,
  title,
  description
}: IHelpfulCardProps) => {
  return (
    <div className="flex flex-col items-center bg-blue-100 justify-center px-6 py-10 rounded-lg w-full max-w-sm">
      <div className="w-14 h-14 bg-blue-200 rounded-full flex items-center justify-center mb-4">
        <Icon color="#0368DB" name={iconName} />
      </div>
      <p className="text-lg font-semibold mb-3">{title}</p>
      <p className="text-sm text-gray-600 text-center">{description}</p>
    </div>
  )
}