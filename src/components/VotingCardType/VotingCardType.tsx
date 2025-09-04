interface IVotingCardType {
  type: string;
  description: string;
  active?: boolean;
  onPress?: () => void;
  testID?: string;
}

export const VotingCardType = ({
  testID,
  type,
  description,
  active = true,
  onPress = () => {},
}: IVotingCardType) => {
  const fibonacci = ["0", "1", "2", "3", "5", "8", "13", "21", "?"];

  return (
    <div data-testid="voting-card-type" className={`transition cursor-pointer w-full h-[140px] border-2 border-[#E4E7EB] rounded-lg bg-[#F9FAFB] flex flex-col items-center order-black justify-center ${active ? "bg-gray-900 text-white" : "bg-white text-black"}`} onClick={onPress}>
      <p className={`text-lg`}>{type}</p>
      <p className={`text-sm`}>{description}</p>
      <div className="flex flex-wrap gap-2.5 mt-3.5">
        {fibonacci.map((num) => (
          <div className="px-2 py-1 bg-white border-black shadow-white flex rounded-md shadow-xs" key={num}>
            <span className="text-[#374151] text-sm font-bold">{num}</span>
          </div>
        ))}
      </div>
    </div>
  )
}