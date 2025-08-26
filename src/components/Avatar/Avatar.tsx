// components/Avatar.tsx
import React, { useMemo } from "react";

interface AvatarProps {
  name: string;
  size?: number; // tamanho opcional, em pixels
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

export const Avatar: React.FC<AvatarProps> = ({ name, size = 48 }) => {
  const initials = useMemo(() => {
    const parts = name.trim().split(" ");
    if (parts.length > 1) {
      return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
    }
    return parts[0].slice(0, 2).toUpperCase();
  }, [name]);

  const bgColor = useMemo(() => {
    const index = Math.floor(Math.random() * colors.length);
    return colors[index];
  }, []);

  return (
    <div
      className={`flex items-center justify-center shadow-sm rounded-full text-white font-bold ${bgColor}`}
      style={{ width: size, height: size, fontSize: size / 2.5 }}
    >
      {initials}
    </div>
  );
};
