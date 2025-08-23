"use client";

import { useEffect } from "react";
import { useAccordion } from "@/contexts/AccordionContext";
import Icon from "../Icon/Icon";
import { Accordion } from "../Accordion/Accordion";
import { terms } from "@/texts/terms";
import { useRouter } from "next/navigation";

export const Terms = () => {
  const router = useRouter();
  const { openIndex, setOpenIndex } = useAccordion();

  const handleGoBack = () => router.back();

  useEffect(() => {
    const openFromHash = () => {
      const match = window.location.hash.match(/accordion-(\d+)/);
      if (match) {
        const idx = Number(match[1]);
        setOpenIndex(idx); // abre o acordeon do hash
        document
          .getElementById(`accordion-${idx}`)
          ?.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    };

    openFromHash();
    window.addEventListener("hashchange", openFromHash);
    return () => window.removeEventListener("hashchange", openFromHash);
  }, [setOpenIndex]);

  return (
    <div className="bg-white w-full p-10 rounded-lg shadow-lg text-black">
      <div className="flex flex-col border-b-2 border-gray-200 pb-8">
        <div className="flex justify-between items-center">
          <h1 className="text-4xl text-black font-bold">Terms and Conditions</h1>
          <button
            onClick={handleGoBack}
            className="flex gap-3 items-center cursor-pointer hover:border-b-1"
          >
            <Icon name="arrowLeft" size={14} color="#6E7482" />
            <p className="mt-0.5 text-[#6E7482]">Back</p>
          </button>
        </div>
        <h3 className="mt-3 text-[#4B5563]">
          Welcome to Planning Poker. These terms govern your use of our agile estimation platform.
        </h3>
        <p className="mt-1 text-[#6E7482] text-sm">Last updated: August 23, 2025</p>
      </div>

      <div className="mt-4">
        {terms.map((term, index) => (
          <section key={index} id={`accordion-${index}`} className="scroll-mt-24">
            <Accordion
              noBackground
              questionSize="LG"
              question={`${index + 1}. ${term.title}`}
              answer={term.content}
              visualContent={term.visualContent}
              visualIcon={term.visualIcon}
              isOpen={openIndex === index}
              onToggle={() => setOpenIndex(openIndex === index ? null : index)}
            />
          </section>
        ))}
      </div>
    </div>
  );
};
