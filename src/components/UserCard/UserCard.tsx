import { GoVerified } from "react-icons/go";
import Icon from "../Icon/Icon";
import { Avatar } from "../Avatar/Avatar";

interface IUserCardProps {
  username: string;
  isCurrentUser: boolean;
  hasVoted?: boolean;
  admin: boolean;
}

export const UserCard = ({
  username,
  isCurrentUser,
  hasVoted,
  admin,
}: IUserCardProps) => {
  return (
    <div className={`flex w-full justify-between bg-[#F9FAFB] items-center p-4 rounded-lg shadow-xs ${isCurrentUser ? 'border-[1px] border-blue-500 bg-blue-50' : ''}`}>
      <div className="flex items-center">
        <Avatar name={username} size={40} />
        <div className="ml-3">
          <p className="font-bold">{username}</p>
          {isCurrentUser && <p className="text-xs">You</p>}
        </div>
      </div>
      <div className={`${hasVoted ? 'text-green-700' : 'text-yellow-700'} flex items-center gap-3 font-bold`}>
        {hasVoted !== undefined && (
          <p className={`text-xs px-3 py-1 rounded-lg ${hasVoted ? 'bg-green-100 border-[1px] border-green-500' : 'bg-yellow-100 border-[1px] border-yellow-500'}`}>{hasVoted ? 'Voted' : 'Not Voted'}</p>
        )}
        {admin && <Icon size={16} color="#FFD700" name="crown" />}
      </div>
    </div>
  )
}