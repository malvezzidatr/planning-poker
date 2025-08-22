"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Icon from "../Icon/Icon";

interface AccordionProps {
  question: string;
  answer: string;
}

export const Accordion = ({ question, answer }: AccordionProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => setIsOpen(!isOpen);

  return (
    <div className="w-full bg-blue-100 rounded-lg overflow-hidden">
      <button
        onClick={handleToggle}
        className="w-full p-4 flex justify-between items-center cursor-pointer transition hover:bg-blue-200"
      >
        <h3 className="font-semibold text-black">{question}</h3>
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
            <p className="text-black pt-2 pb-4">
              {answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
