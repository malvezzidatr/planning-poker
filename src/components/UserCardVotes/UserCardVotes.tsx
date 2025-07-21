import Icon from "../Icon/Icon";
import { UserCard } from "../UserCard/UserCard";

interface IUserCardVotesProps {
  isCurrentUser?: boolean;
  username?: string;
  userType?: "guest" | "player";
  vote?: string;
}

export const UserCardVotes = ({
  isCurrentUser = false,
  username = "",
  userType = "player",
  vote,
}: IUserCardVotesProps) => {
  return (
    <div className={`flex gap-4 flex-col bg-[#F9FAFB] items-center pb-5 ${isCurrentUser ? 'border-[1px] border-blue-500 bg-blue-50' : ''} rounded-lg shadow-xs`}>
      <div className={`flex w-full justify-between items-center p-4 rounded-lg`}>
        <div className="flex items-center">
          <Icon name="user" className="mr-4" />
          <div className="h-8">
            <p className="font-bold">{username}</p>
            {isCurrentUser && <p className="text-xs">You</p>}
          </div>
        </div>
        <div>
          {userType && (
            <p className="text-xs">{userType === "guest" ? "Guest" : "Player"}</p>
          )}
        </div>
      </div>
      <div className={`p-4 w-16 h-20 flex items-center justify-center bg-white rounded-lg shadow-md ${isCurrentUser ? 'border-[2px] border-blue-500' : ''}`}>
        <p className={`text-3xl font-bold ${isCurrentUser ? 'text-blue-500' : 'text-gray-500'}`}>{vote}</p>
      </div>
    </div>
  );
}