import { Input } from "@/components/Input/Input"
import { VotingCardType } from "@/components/VotingCardType/VotingCardType"

export const DeckAndSettings = () => {
  return (
    <div className="p-6 mb-40">
      <div className="mb-6">
        <p className="mb-2">Choose your deck</p>
        <VotingCardType testID={"voting-card-type"} type="Fibonacci" description="Classic agile estimation" />
      </div>
    </div>
  )
}