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
        <title>Planning Poker App - Estimate Tasks with Your Team</title>
        <meta name="description" content="Use Planning Poker to estimate effort or size of user stories with your agile team in a fun and effective way." />
      </Head>
      <div className="min-h-screen bg-[#F3F8FE] flex flex-col">
        <Header />
        <div className="bg-[#F3F8FE] xl:px-24 xl:py-24 mt-12 flex items-center lg:justify-between justify-center w-full sm:px-12 sm:py-12 px-6 py-6">
          <div className="lg:w-1/2 sm:w-3/4 w-full">
            <h1 className="text-[#004593] font-bold sm:text-5xl mb-4 text-3xl">Estimate tasks with your team, simplified</h1>
            <p className="text-[#4B5563] sm:text-xl w-11/12 text-md">Planning Poker is a consenseus-based estimation technique for agile teams. Estimate effort or relative size of user stories in a fun, effective way.</p>
            {/* CSR Component */}
            <JoinSessionCardGroup />
          </div>
          <Image className="rounded-lg hidden lg:block" width={450} height={450} alt="Illustration of Planning Poker estimation session" src={'/Image_home.png'} />
        </div>
        <div className="flex flex-col w-full justify-center items-center text-black">
          <p className="sm:text-3xl font-bold mb-10 text-2xl">How it works</p>
          <div className="flex items-center lg:gap-2 justify-between w-full xl:px-24 mb-14 px-12 lg:flex-row flex-col gap-6">
            <HelpfulCard iconName="groupOfUsers" title="Create a Room" description="Start a new estimation session and invite your teams members to join using a unique room code." />
            <HelpfulCard iconName="handTogether" title="Vote Together" description="Everyone selects a card representing their estimate. Votes remain hidden until revealed." />
            <HelpfulCard iconName="chartPie" title="Reach Consensus" description="Discuss differences in estimates and revote until the teams reaches a consensus." />
          </div>
        </div>
        <div className="flex flex-col items-center mb-10">
          <h2 className="text-black sm:text-3xl font-bold mb-10 text-2xl">Frequently Asked Questions</h2>
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
