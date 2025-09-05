import Header from "@/components/Header/Header";
import Image from "next/image";
import { HelpfulCard } from "@/components/HelpfulCard/HelpfulCard";
import { Footer } from "@/components/Footer/footer";
import Head from "next/head";
import { JoinSessionCardGroup } from "@/components/JoinSessionCardGroup/JoinSessionCardGroup";
import { Accordion } from "@/components/Accordion/Accordion";
import { faq } from "@/texts/faq";

export default function Home() {
  return (
    <>
      <Head>
        <title>Planning Poker Online Free — Agile Estimation Tool for Scrum Teams</title>
        <meta name="description" content="Free online Planning Poker tool for Scrum and Agile teams. Create a room, invite your team, vote in real time and reach consensus fast." />
      </Head>
      <div className="min-h-screen bg-[#F3F8FE] flex flex-col">
        <Header />
        <div className="bg-[#F3F8FE] xl:px-24 xl:py-24 mt-12 flex items-center lg:justify-between justify-center w-full sm:px-12 sm:py-12 px-6 py-6">
          <div className="lg:w-1/2 sm:w-3/4 w-full">
            <h1 className="text-gray-900 font-bold sm:text-5xl mb-4 text-3xl">Planning Poker Online Free App for Scrum Teams</h1>
            <h2 className="text-[#4B5563] sm:text-xl w-11/12 text-md">Planning Poker is a consensus-based estimation technique for Agile/Scrum teams. Estimate the effort or relative size of user stories in a fun and effective way.</h2>
            {/* CSR Component */}
            <JoinSessionCardGroup />
          </div>
          <Image className="rounded-lg hidden lg:block" width={450} height={450} alt="Illustration of Planning Poker estimation session" src={'/Image_home.png'} />
        </div>
        <div className="flex flex-col items-center mb-10 px-6 sm:px-12 lg:px-24">
          <h2 className="sm:text-3xl text-gray-900 font-bold mb-6 text-2xl">
            What is Planning Poker?
          </h2>
          <p className="text-[#4B5563] sm:text-lg text-md max-w-3xl text-center">
            Planning Poker (also known as <strong>Scrum Poker</strong> or <strong>Estimation Poker</strong>) 
            is a consensus-based technique used by Agile and Scrum teams to estimate 
            the effort of user stories. Our <strong>Planning Poker online free tool</strong> allows 
            distributed teams to collaborate in real time, making estimation fast, fun, 
            and effective.
          </p>
        </div>
        <div className="flex flex-col w-full justify-center items-center text-black">
          <h2 className="sm:text-3xl font-bold mb-10 text-2xl">How Planning Poker Online Works</h2>
          <div className="flex items-center lg:gap-2 justify-between w-full xl:px-24 mb-14 px-12 lg:flex-row flex-col gap-6">
            <HelpfulCard iconName="groupOfUsers" title="Create a Free Planning Poker Room Online" description="Start a new estimation session and invite your teams members to join using a unique room code." />
            <HelpfulCard iconName="handTogether" title="Agile Teams Vote Together in Real Time" description="Everyone selects a card representing their estimate. Votes remain hidden until revealed." />
            <HelpfulCard iconName="chartPie" title="Reach Estimation Consensus with Planning Poker" description="Discuss differences in estimates and revote until the teams reaches a consensus." />
          </div>
        </div>
        <div className="flex flex-col items-center mb-10">
          <h2 className="text-black sm:text-3xl font-bold mb-10 text-2xl text-center">Planning Poker Online – Frequently Asked Questions</h2>
          <div className="lg:w-2/3 flex flex-col gap-4 md:w-3/4 w-5/6">
            {
              faq.map((item) => (
                <Accordion questionSize="MD" key={item.question} question={item.question} answer={item.answer} />
              ))
            }
          </div>
        </div>
        <Footer />
      </div>
    </>

  );
}
