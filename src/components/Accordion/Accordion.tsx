"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Icon, { IconName } from "../Icon/Icon";
import { accordion, accordionQuestionSize, anwserQuestionSize } from "./AccordionVariants";

interface AccordionProps {
  question: string;
  answer: string;
  noBackground?: boolean;
  questionSize?: "SM" | "MD" | "LG";
  visualContent?: string;
  visualIcon?: IconName;
  isOpen?: boolean;
  onToggle?: () => void;
}

export const Accordion = ({
  question,
  answer,
  noBackground = false,
  questionSize = "MD",
  visualContent,
  visualIcon,
  isOpen: controlledIsOpen,
  onToggle
}: AccordionProps) => {
  const [internalOpen, setInternalOpen] = useState(false);
  const isOpen = controlledIsOpen ?? internalOpen;

  const handleToggle = () => {
    if (onToggle) onToggle();
    else setInternalOpen((v) => !v);
  };
  
  return (
    <div className={accordion({ noBackground })}>
      <button
        type="button"
        onClick={handleToggle}
        aria-expanded={isOpen}
        className={`w-full p-4 flex justify-between items-center cursor-pointer transition ${noBackground ? "hover:bg-gray-100" : "hover:bg-gray-200"}`}
      >
        <h3 className={accordionQuestionSize({ size: questionSize })}>{question}</h3>
        <motion.div animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.2 }}>
          <Icon name="chevronDown" color="#000" size={18} />
        </motion.div>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
            className="px-4"
          >
            <p className={anwserQuestionSize({ size: questionSize })}>{answer}</p>
            {visualContent && (
              <div className="w-full flex bg-blue-100 rounded-md text-black p-4 items-center gap-2">
                {visualIcon && <Icon name={visualIcon} color="#3B82F6" size={20} />}
                <p className="whitespace-pre-line">{visualContent}</p>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
