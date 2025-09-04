import { ActiveCard } from "@/components/ActiveCard/ActiveCard"
import { VotingCardType } from "@/components/VotingCardType/VotingCardType"

export const DeckAndSettings = () => {
  return (
    <div className="px-6 overflow-y-auto">
      <div className="mb-6">
        <p className="mb-2">Choose your deck</p>
        <VotingCardType testID={"voting-card-type"} type="Fibonacci" description="Classic agile estimation" />
      </div>
      <div>
        <p className="mb-2">Room Settings</p>
        <ActiveCard title="Enable timer per rounded" description="Set a time limit for each voting round" />
      </div>
    </div>
  )
}