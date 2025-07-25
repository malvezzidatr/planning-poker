import { voteResult } from "./VoteResultVariants";

interface IVoteResultProps {
  vote: number;
  label: string;
  color?: "green" | "blue" | "purple";
  toFixed?: number;
}

export const VoteResult = ({ vote, label, color = "green", toFixed }: IVoteResultProps) => {
  const isNumber = typeof vote === "number" && !isNaN(vote);

  return (
    <div className={voteResult({ color })}>
      <p className="font-bold text-4xl">
        {isNumber ? vote.toFixed(toFixed || 0) : vote}
      </p>
      <p className="text-md">{label}</p>
    </div>
  );
};
