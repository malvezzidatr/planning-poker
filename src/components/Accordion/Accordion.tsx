"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Icon from "../Icon/Icon";
import { accordion, accordionQuestionSize } from "./AccordionVariants";

interface AccordionProps {
  question: string;
  answer: string;
  noBackground?: boolean;
  questionSize?: "SM" | "MD" | "LG";
}

export const Accordion = ({ question, answer, noBackground = false, questionSize = "MD" }: AccordionProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => setIsOpen(!isOpen);

  return (
    <div className={accordion({ noBackground })}>
      <button
        onClick={handleToggle}
        className={`w-full p-4 flex justify-between items-center cursor-pointer transition ${noBackground ? 'hover:bg-gray-100' : 'hover:bg-blue-200'}`}
      >
        <h3 className={accordionQuestionSize({ size: questionSize })}>{question}</h3>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <Icon
            name={"chevronDown"}
            color="#000"
            size={18}
          />
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
            <p className="text-black pt-2 pb-4 whitespace-pre-line">
              {answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
