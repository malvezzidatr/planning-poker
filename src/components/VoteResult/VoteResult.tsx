import { voteResult } from "./VoteResultVariants";

interface IVoteResultProps {
  vote: string;
  label: string;
  color?: "green" | "blue" | "purple";
}

export const VoteResult = ({ vote, label, color = "green" }: IVoteResultProps) => {
  return (
    <div className={voteResult({ color })}>
      <p className="font-bold text-4xl">{vote}</p>
      <p className="text-md">{label}</p>
    </div>
  );
};
