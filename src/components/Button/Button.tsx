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
}

export const Button = ({
  onClick,
  text,
  iconName,
  full,
  variant = "primary",
  textCenter = false,
  outlined,
  disabled
}: IButtonProps) => {
  return (
    <button className={button({ variant, full, textCenter, outlined, disabled })} disabled={disabled} onClick={onClick}>
      {iconName && (
        <Icon
          size={14}
          name={iconName}
          color={variant === "primary" ? "#FFF" : "#374151"}
        />
      )}
      <p className="ml-2">{text}</p>
    </button>
  );
};
