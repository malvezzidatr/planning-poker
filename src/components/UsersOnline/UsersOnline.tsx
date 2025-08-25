import { UserCard } from "../UserCard/UserCard";
import { ReactNode } from "react";

interface IUsersOnline {
  users: { username: string; role: "player" | "spectator" }[];
  username: string;
  votedUsers?: Set<string>;
  title: string;
  children?: ReactNode;
}

export const UsersOnline = ({ users, votedUsers, username, title, children }: IUsersOnline) => {
  return (
    <div className="p-6 bg-white rounded-lg shadow-md w-[300px] flex flex-col gap-4">
      <div className="flex items-center gap-2 justify-between">
        <p className="font-bold">
          {title} ({users.length})
        </p>
        {votedUsers && (
          votedUsers.size === users.length ? (
            <div className="text-xs flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full" />
              <p className="text-xs">completed</p>
            </div>
          ) : (
            <div className="text-xs flex items-center gap-2">
              <div className="w-2 h-2 bg-yellow-500 rounded-full" />
              <p className="text-gray-500">uncompleted</p>
            </div>
          )
        )}
      </div>
      {users?.map((u, i) => {
        const isCurrentUser = u.username === username;
        return (
          <UserCard
            key={i}
            username={u.username}
            isCurrentUser={isCurrentUser}
            hasVoted={votedUsers?.has(u.username)}
          />
        );
      })}
      {children}
    </div>
  );
};
