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
  FaChevronDown,
  FaChevronUp,
  FaArrowLeft,
  FaExchangeAlt,
  FaTimesCircle,
  FaExclamationTriangle,
  FaCrown,
  FaGoogle,
  FaAngleDoubleRight,
  FaTrashAlt,
} from "react-icons/fa";
import { MdEmail } from "react-icons/md";

const icons = {
  plus: FaPlus,
  arrowRight: FaArrowRight,
  arrowLeft: FaArrowLeft,
  close: FaTimes,
  closeCircle: FaTimesCircle,
  attention: FaExclamationTriangle,
  user: FaUserAlt,
  eye: FaEye,
  copy: FaCopy,
  refresh: FaRedoAlt,
  groupOfUsers: FaUserFriends,
  handTogether: FaHandsHelping,
  chartPie: FaChartPie,
  github: FaGithub,
  linkedin: FaLinkedin,
  chevronDown: FaChevronDown,
  chevronUp: FaChevronUp,
  email: MdEmail,
  change: FaExchangeAlt,
  crown: FaCrown,
  google: FaGoogle,
  doubleArrowRight: FaAngleDoubleRight,
  trash: FaTrashAlt,
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
  return (
    <span data-testid={testID}>
      <IconComponent size={size} color={color} className={className} />
    </span>
  );
}
