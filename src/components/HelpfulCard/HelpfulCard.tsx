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
    <div className="flex flex-col items-center bg-blue-100 justify-center px-6 py-10 rounded-lg lg:h-[250px] lg:max-w-sm sm:w-3/4 w-full">
      <div className="w-14 h-14 bg-blue-200 rounded-full flex items-center justify-center mb-4">
        <Icon color="#0368DB" name={iconName} />
      </div>
      <h3 className="text-lg font-semibold mb-3 text-center">{title}</h3>
      <p className="text-sm text-gray-600 text-center">{description}</p>
    </div>
  )
}