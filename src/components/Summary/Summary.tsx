"use client";

import { useAccordion } from "@/contexts/AccordionContext";
import { summary, summaryText } from "./SummaryVariants";

interface ISummaryProps {
  title: string;
  content: string[];
  fixed?: boolean;
  useContext?: boolean;
}

/*
  Componente acoplado ao accordion, estudar possibilidade de tirar esse acoplamento.
*/

export const Summary = ({ title, content, fixed, useContext }: ISummaryProps) => {
  const accordion = useAccordion();

  return (
    <nav className={`${summary({ fixed })}`}>
      <h3 className="text-lg text-black font-bold mb-4">{title}</h3>
      <ul className="text-black">
        {content.map((item, index) => {
          const isActive = useContext ? accordion.openIndex === index : false;

          return (
            <li key={item} className="mb-3">
              <a
                href={`#accordion-${index}`}
                className={`${summaryText({ active: isActive })}`}
              >
                <span>{index + 1}.</span>
                <span>{item}</span>
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};
