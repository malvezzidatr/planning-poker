interface ICardProps {
  onClick?: () => void;
  value: string;
  selectedCard?: string;
}

export const Card = ({ onClick, value, selectedCard }: ICardProps) => {
  return (
    <div
      onClick={onClick}
      className={`
        group cursor-pointer transition w-24 h-32 rounded-lg shadow-md 
        flex items-center justify-center border-2 
        ${selectedCard === value 
          ? "bg-blue-50 border-blue-500" 
          : "bg-white border-gray-200 hover:bg-blue-50 hover:border-blue-500"
        }
      `}
    >
      <p
        className={`text-3xl font-bold ${selectedCard === value ? "text-blue-500" : "group-hover:text-blue-500"}`}
      >{value}</p>
    </div>
  );
};