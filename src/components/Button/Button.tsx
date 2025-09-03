import { button } from "./ButtonVariants";
import Icon, { IconName } from "../Icon/Icon";

interface IButtonProps {
  onClick: () => void;
  text: string;
  iconName?: IconName;
  full?: boolean;
  variant?: "primary" | "secondary";
  textCenter?: boolean;
  outlined?: boolean;
  disabled?: boolean;
  backgroundColor?: 'blue' | 'green' | 'red' | 'none';
  iconColor?: string;
}

export const Button = ({
  onClick,
  text,
  iconName,
  full,
  variant = "primary",
  textCenter = false,
  outlined,
  disabled,
  backgroundColor = 'none',
  iconColor,
}: IButtonProps) => {
  return (
    <button className={button({ variant, full, textCenter, outlined, disabled, backgroundColor })} disabled={disabled} onClick={onClick}>
      {iconName && (
        <Icon
          className="mr-2"
          size={14}
          name={iconName}
          color={iconColor}
        />
      )}
      <p className="text-sm font-bold">{text}</p>
    </button>
  );
};
