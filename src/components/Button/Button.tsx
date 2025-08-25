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
}: IButtonProps) => {
  return (
    <button className={button({ variant, full, textCenter, outlined, disabled, backgroundColor })} disabled={disabled} onClick={onClick}>
      {iconName && (
        <Icon
          size={14}
          name={iconName}
          color={variant === "primary" ? "#FFF" : "#374151"}
        />
      )}
      <p className="ml-2 text-sm">{text}</p>
    </button>
  );
};
