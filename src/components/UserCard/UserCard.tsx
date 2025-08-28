import { GoVerified } from "react-icons/go";
import Icon from "../Icon/Icon";
import { Avatar } from "../Avatar/Avatar";
import Badge from "../Badge/Badge";

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
      <div className={`flex items-center gap-3 font-bold`}>
        {hasVoted !== undefined && (
          hasVoted ? (
            <Badge 
              textColor="text-green-700" 
              text="Voted" 
              bgColor="bg-green-200" 
            />
          ) : (
            <Badge 
              bgColor="bg-orange-200" 
              textColor="text-orange-700" 
              text="Voting" 
            />
          )
        )}
        {admin && <Icon size={16} color="#FFD700" name="crown" />}
      </div>
    </div>
  )
}