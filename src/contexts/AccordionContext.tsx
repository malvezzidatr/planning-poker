"use client";

import { createContext, useContext, useState, ReactNode } from "react";

interface AccordionContextType {
  openIndex: number | null;
  setOpenIndex: (index: number | null) => void;
}

const AccordionContext = createContext<AccordionContextType | undefined>(undefined);

export const AccordionProvider = ({ children }: { children: ReactNode }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <AccordionContext.Provider value={{ openIndex, setOpenIndex }}>
      {children}
    </AccordionContext.Provider>
  );
};

/**
 * Contexto que gerencia qual Accordion está aberto na página, ele funciona junto do componente Summary.
 * 
 * openIndex: índice do Accordion atualmente aberto (null se nenhum)
 * setOpenIndex: função para atualizar o Accordion ativo
 * 
 * Uso:
 * const { openIndex, setOpenIndex } = useAccordion();
 * setOpenIndex(2); // abre o terceiro Accordion
*/

export const useAccordion = () => {
  const context = useContext(AccordionContext);
  if (!context) throw new Error("useAccordion must be used within AccordionProvider");
  return context;
};
