import { ActiveCard } from "@/components/ActiveCard/ActiveCard"
import { VotingCardType } from "@/components/VotingCardType/VotingCardType"
import { useRoomStore } from "@/store/roomStore";
import { useEffect } from "react";

export const DeckAndSettings = () => {
  const { deck, setDeck, settings, toggleTimer, setTimer } = useRoomStore();
  
  useEffect(() => {
    setDeck('Fibonacci');
  }, []);

  return (
    <div className="px-6 overflow-y-auto">
      <div className="mb-6">
        <p className="mb-2">Choose your deck</p>
        <VotingCardType testID={"voting-card-type"} type="Fibonacci" description="Classic agile estimation" />
      </div>
      <div>
        <p className="mb-2">Room Settings</p>
        <ActiveCard active={settings.enableTimer} timer={settings.timer} setTimer={setTimer} onActive={toggleTimer} title="Enable timer per rounded" description="Set a time limit for each voting round" />
      </div>
    </div>
  )
}