import { GoVerified } from "react-icons/go";
import Icon from "../Icon/Icon";

interface IUserCardProps {
  username: string;
  isCurrentUser: boolean;
  hasVoted?: boolean;
  userType?: "guest" | "player";
}

export const UserCard = ({
  username,
  isCurrentUser,
  hasVoted,
  userType,
}: IUserCardProps) => {
  return (
    <div className={`flex w-full justify-between bg-[#F9FAFB] items-center p-4 rounded-lg shadow-xs ${isCurrentUser ? 'border-[1px] border-blue-500 bg-blue-50' : ''}`}>
      <div className="flex items-center">
        <Icon name="user" className="mr-4" />
        <div>
          <p className="font-bold">{username}</p>
          {isCurrentUser && <p className="text-xs">You</p>}
        </div>
      </div>
      <div className={`${hasVoted ? 'text-green-500' : 'text-yellow-500'}`}>
        {hasVoted !== undefined && (
          <p className={`text-xs px-3 py-1 rounded-lg ${hasVoted ? 'bg-green-100 border-[1px] border-green-500' : 'bg-yellow-100 border-[1px] border-yellow-500'}`}>{hasVoted ? 'Voted' : 'Not Voted'}</p>
        )}
        {userType && (
          <p className="text-xs">{userType === "guest" ? "Guest" : "Player"}</p>
        )}
      </div>
    </div>
  )
}