import React, { memo, useMemo } from "react";

interface AvatarProps {
  name: string;
  size?: number;
}

const colors = [
  "bg-red-500",
  "bg-blue-500",
  "bg-green-500",
  "bg-yellow-500",
  "bg-purple-500",
  "bg-pink-500",
  "bg-indigo-500",
  "bg-teal-500",
  "bg-orange-500",
];

const AvatarComponent: React.FC<AvatarProps> = ({ name, size = 48 }) => {
  const initials = useMemo(() => {
    const parts = name.trim().split(" ");
    if (parts.length > 1) {
      return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
    }
    return parts[0].slice(0, 2).toUpperCase();
  }, [name]);

  const bgColor = useMemo(() => {
    let hash = 0;
    for (let i = 0; i < name.length; i++) {
      hash = name.charCodeAt(i) + ((hash << 5) - hash);
    }
    const index = Math.abs(hash) % colors.length;
    return colors[index];
  }, [name]);

  return (
    <div
      className={`flex items-center justify-center shadow-sm rounded-full text-white font-bold ${bgColor}`}
      style={{ width: size, height: size, fontSize: size / 2.5 }}
    >
      {initials}
    </div>
  );
};

export const Avatar = memo(AvatarComponent);
