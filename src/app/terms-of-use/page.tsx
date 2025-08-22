import Header from "@/components/Header/Header";
import { Summary } from "@/components/Summary/Summary";
import { Terms } from "@/components/Terms/Terms";

export const metadata = {
  title: 'Planning Poker App | Terms of Use',
};

const TermsOfUsePage = () => {
  const summaryContent = ['Introduction', 'User Responsibilities', 'Account And Access', 'Acceptable Use Policy', 'Limitation of Liability', 'Privacy and Data Usage', 'Changes to Terms', 'Contact Information'];
  return (
    <>
      <Header />
      <div className="flex gap-14 bg-[#F9FAFB] min-h-screen px-20 pt-10">
        <div>
          <Summary
            title="Table of Contents"
            content={summaryContent}
          />
        </div>
        <Terms />
      </div>
    </>
  )
}

export default TermsOfUsePage;