interface IVotingCardType {
  type: string;
  description: string;
  active?: boolean;
  onPress?: () => void;
}

export const VotingCardType = ({
  type,
  description,
  active = true,
  onPress = () => {},
}: IVotingCardType) => {
  const fibonacci = ["0", "1", "2", "3", "5", "8", "13", "21", "?"];

  return (
    <div className={`transition cursor-pointer w-full h-[140px] border-2 border-[#E4E7EB] rounded-lg bg-[#F9FAFB] flex flex-col items-center justify-center ${active ? "border-blue-500 bg-blue-50" : ""}`} onClick={onPress}>
      <p className={`${active ? "text-blue-500" : "text-[#374151]"}  text-lg`}>{type}</p>
      <p className={`${active ? "text-blue-500" : "text-[#6A7280]"} text-sm`}>{description}</p>
      <div className="flex flex-wrap gap-2 mt-2">
        {fibonacci.map((num, index) => (
          <div className="px-2 py-1 bg-white flex rounded-md shadow-xs" key={num}>
            <span className="text-[#374151] text-sm font-bold">{num}</span>
          </div>
        ))}
      </div>
    </div>
  )
}