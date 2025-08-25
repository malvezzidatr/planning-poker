import { motion } from "framer-motion";
import Icon, { IconName } from "../Icon/Icon";
import { alert } from "./AlertVariants";
import { useEffect } from "react";

interface IAlertProps {
  text: string;
  iconName?: IconName;
  closable?: boolean;
  onClose?: () => void;
  type: "success" | "error" | "warning";
}

export const Alert = ({ text, iconName, closable, onClose, type }: IAlertProps) => {
  useEffect(() => {
    if (!onClose) return;
    const timer = setTimeout(() => {
      onClose();
    }, 4000);

    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 50 }}
      transition={{ duration: 0.3 }}
      className={alert({ type })}
    >
      {iconName && <Icon size={20} name={iconName} />}
      <p>{text}</p>
      {closable && (
        <button
          onClick={onClose}
          className="hover:opacity-70 transition cursor-pointer pl-4"
        >
          <Icon size={18} name="close" />
        </button>
      )}
    </motion.div>
  );
};
