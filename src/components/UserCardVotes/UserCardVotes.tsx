import Icon from "../Icon/Icon";
import { UserCard } from "../UserCard/UserCard";
import { userCardVotes } from "./UserCardVotesVariants";

interface IUserCardVotesProps {
  isCurrentUser?: boolean;
  username?: string;
  userType?: "guest" | "player";
  vote?: string;
  color?: "green" | "yellow";
}

export const UserCardVotes = ({
  isCurrentUser = false,
  username = "",
  userType = "player",
  vote,
  color,
}: IUserCardVotesProps) => {
  return (
    <div className={userCardVotes({ color, isCurrentUser })}>
      <div className="flex w-full justify-between items-center p-4 rounded-lg">
        <div className="flex items-center">
          <Icon name="user" className="mr-4" />
          <div className="h-8">
            <p className="font-bold flex items-center gap-1">{username} {isCurrentUser && <span className="text-xs"> (You)</span>}</p>
            {color === 'yellow' && <p className="text-xs italic">biggest vote</p>}
            {color === 'green' && <p className="text-xs italic">lowest vote</p>}
          </div>
        </div>
        <div>
          {userType && (
            <p className="text-xs">{userType === "guest" ? "Guest" : "Player"}</p>
          )}
        </div>
      </div>
      <div
        className={`p-4 w-16 h-20 flex items-center justify-center bg-white rounded-lg shadow-md ${
          isCurrentUser ? "border-[2px] border-blue-500" : ""
        }`}
      >
        {vote ? (
          <p
            className={`text-3xl font-bold ${
              isCurrentUser ? "text-blue-500" : "text-gray-500"
            }`}
          >
            {vote}
          </p>
        ) : (
          <p className="text-3xl font-bold">?</p>
        )}
      </div>
    </div>
  );
};
