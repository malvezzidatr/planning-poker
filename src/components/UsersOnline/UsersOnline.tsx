"use client";

import { UserCard } from "../UserCard/UserCard";
import { ReactNode } from "react";

interface IUsersOnline {
  users: { username: string; role: "player" | "spectator"; admin: boolean }[];
  username: string;
  votedUsers?: Set<string>;
  title: string;
  children?: ReactNode;
  type?: "player" | "spectator";
}

export const UsersOnline = ({
  users,
  votedUsers,
  username,
  title,
  children,
  type,
}: IUsersOnline) => {
  return (
    <div className="p-6 pb-10 bg-white rounded-lg shadow-md lg:w-[380px] w-full flex flex-col gap-4 overflow-hidden">
      <div className="flex items-center gap-2 justify-between">
        <p className="font-bold">
          {title} ({users.length})
        </p>
        {type === "player" && users.length === 0 ? (
          <div className="text-xs flex items-center gap-2">
            <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
            <p className="text-xs text-red-600 font-bold ">waiting</p>
          </div>
        ) : votedUsers ? (
          votedUsers.size === users.length ? (
            <div className="text-xs flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full" />
              <p className="text-xs text-green-600 font-bold">completed</p>
            </div>
          ) : (
            <div className="text-xs flex items-center gap-2">
              <div className="w-2 h-2 bg-yellow-500 rounded-full" />
              <p className="text-xs text-yellow-600 font-bold">voting</p>
            </div>
          )
        ) : null}
      </div>
      {users?.map((user) => {
        const isCurrentUser = user.username === username;
        return (
          <div
            key={user.username}
            style={{ overflow: "hidden" }}
          >
            <UserCard
              username={user.username}
              isCurrentUser={isCurrentUser}
              hasVoted={votedUsers?.has(user.username)}
              admin={user.admin}
            />
          </div>
        );
      })}

      <div className="mt-4">{children}</div>
    </div>
  );
};
