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
    <div className="flex flex-col items-center bg-white shadow-md border justify-center px-6 rounded-lg lg:h-[250px] lg:max-w-sm sm:w-3/4 w-full">
      <div className="w-14 h-14 bg-gray-900 rounded-full flex items-center justify-center mb-4">
        <Icon color="#fff" name={iconName} />
      </div>
      <h3 className="text-lg font-semibold mb-3 text-gray-900 text-center">{title}</h3>
      <p className="text-sm text-gray-900 text-center">{description}</p>
    </div>
  )
}