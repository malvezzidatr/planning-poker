import { Footer } from "@/components/Footer/footer";
import Header from "@/components/Header/Header";
import { Summary } from "@/components/Summary/Summary";
import { Terms } from "@/components/Terms/Terms";
import { AccordionProvider } from "@/contexts/AccordionContext";

export const metadata = {
  title: 'Planning Poker App | Terms of Use',
};

const TermsOfUsePage = () => {
  const summaryContent = ['Introduction', 'User Responsibilities', 'Account And Access', 'Acceptable Use Policy', 'Limitation of Liability', 'Privacy and Data Usage', 'Changes to Terms', 'Contact Information'];

  return (
    <AccordionProvider>
      <>
        <Header />
        <div className="flex gap-14 bg-[#F9FAFB] min-h-screen px-20 py-10">
          <div>
            <Summary
              title="Table of Contents"
              content={summaryContent}
              fixed
              useContext
            />
          </div>
          <Terms />
        </div>
        <Footer />
      </>
    </AccordionProvider>
  )
}

export default TermsOfUsePage;