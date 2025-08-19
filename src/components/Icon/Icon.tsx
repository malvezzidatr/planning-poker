import {
  FaPlus,
  FaArrowRight,
  FaTimes,
  FaUserAlt,
  FaEye,
  FaCopy,
  FaRedoAlt,
  FaUserFriends,
  FaHandsHelping,
  FaChartPie,
  FaGithub,
  FaLinkedin,
} from "react-icons/fa";

const icons = {
  plus: FaPlus,
  arrowRight: FaArrowRight,
  close: FaTimes,
  user: FaUserAlt,
  eye: FaEye,
  copy: FaCopy,
  refresh: FaRedoAlt,
  groupOfUsers: FaUserFriends,
  handTogether: FaHandsHelping,
  chartPie: FaChartPie,
  github: FaGithub,
  linkedin: FaLinkedin,
} as const;

export type IconName = keyof typeof icons;

interface IconProps {
  name: IconName;
  size?: number;
  color?: string;
  className?: string;
  testID?: string;
}

export default function Icon({ name, size = 24, color, className, testID }: IconProps) {
  const IconComponent = icons[name];
  return <IconComponent data-testid={testID} size={size} color={color} className={className} />;
}
