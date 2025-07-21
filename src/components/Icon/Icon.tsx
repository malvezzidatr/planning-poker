import {
  FaPlus,
  FaArrowRight,
  FaTimes,
  FaUserAlt,
  FaEye,
  FaCopy,
} from "react-icons/fa";

const icons = {
  plus: FaPlus,
  arrowRight: FaArrowRight,
  close: FaTimes,
  user: FaUserAlt,
  eye: FaEye,
  copy: FaCopy,
} as const;

export type IconName = keyof typeof icons;

interface IconProps {
  name: IconName;
  size?: number;
  color?: string;
  className?: string;
}

export default function Icon({ name, size = 24, color, className }: IconProps) {
  const IconComponent = icons[name];
  return <IconComponent size={size} color={color} className={className} />;
}
