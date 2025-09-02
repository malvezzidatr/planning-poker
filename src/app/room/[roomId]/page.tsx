"use client";

import { useRouter, useParams } from "next/navigation";
import Header from "@/components/Header/Header";
import { Button } from "@/components/Button/Button";
import { UserCardVotes } from "@/components/UserCardVotes/UserCardVotes";
import { Card } from "@/components/Card/Card";
import { ProgressBar } from "@/components/ProgressBar/ProgressBar";
import { JoinRoomModal } from "@/components/JoinRoomModal/JoinRoomModal";
import Icon from "@/components/Icon/Icon";
import { VoteResult } from "@/components/VoteResult/VoteResult";
import { UsersOnline } from "@/components/UsersOnline/UsersOnline";
import { useRoom } from "./useRoom";
import { Footer } from "@/components/Footer/footer";
import Badge from "@/components/Badge/Badge";
import { SessionCompleteModal } from "@/components/SessionCompleteModal/SessionCompleteModal";

export default function RoomPage() {
  const { roomId } = useParams();

  const {
    averageVotes,
    card,
    copyLink,
    isOpenModalJoinRoom,
    isLoading,
    joinRoom,
    mostVoted,
    resetVotes,
    revealVotes,
    revealed,
    submitVote,
    username,
    votedUsers,
    votes,
    playerUsers,
    spectatorUsers,
    userIsSpectator,
    handleChangeRole,
    currentUser,
    userStories,
    currentStory,
    nextStory,
    roomIsFinished,
    handleFinishSession,
    handleCloseFinishModal,
  } = useRoom(roomId);
  const router = useRouter();

  if (isLoading) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-[#DF0979] border-opacity-75"></div>
      </main>
    )
  }

  return (
    <>
      <Header />
      <div className="min-h-screen bg-[#F9FAFB] px-4 sm:px-18 pb-8 flex">
        <div className="w-full mx-auto mt-10 md:mt-20 text-black rounded-lg">
          <div className="bg-white p-6 rounded-lg shadow-md flex justify-between items-center">
            <p className="font-bold text-2xl">Room: <span className="text-blue-500 font-bold">{roomId}</span></p> 
            <Button onClick={copyLink} text="Copy room" iconName="copy" />
          </div>
          <div className="flex flex-col lg:flex-row gap-8 mt-6">
            <div className="flex-col flex gap-8">
              <UsersOnline title="Players" users={playerUsers} type="player" votedUsers={votedUsers} username={username}>
                {playerUsers.length === 0 ? (
                  <div className="w-full relative">
                    <div className="h-full shadow-2xl rounded-lg absolute shadow-blue-500 z-0 w-full animate-pulse" />
                    <button onClick={handleChangeRole} className="cursor-pointer transition hover:bg-blue-50 w-full bg-white rounded-lg relative z-10 flex flex-col items-center justify-center px-4 py-8 bg-white-100 border-2 border-dashed border-gray-300">
                      <Icon name="userPlus" color="#6a7282" size={40} />
                      <p className="text-gray-600">No players yet</p>
                      <p className="text-gray-500 text-xs whitespace-break-spaces">Waiting for someone to join as {"\n"} player</p>
                    </button>
                  </div>
                ) : userIsSpectator && (
                  <button onClick={handleChangeRole} className="flex gap-3 w-full items-center cursor-pointer transition justify-center text-center text-blue-500 hover:text-blue-700">
                    <Icon name="change" size={16} />
                    <p className="text-sm">Join as Player</p>
                  </button>
                )}
              </UsersOnline>
              <UsersOnline title="Spectators" users={spectatorUsers} username={username}>
                {!userIsSpectator && (
                  <button onClick={handleChangeRole} className="flex gap-3 w-full items-center cursor-pointer transition justify-center text-center text-blue-500 hover:text-blue-700">
                    <Icon name="change" size={16} />
                    <p className="text-sm">Join as Spectator</p>
                  </button>
                )}
              </UsersOnline>
            </div>
            <div className="flex-col w-full">
              <div className="bg-white w-full rounded-lg shadow-sm p-6 mb-8">
                <div className="flex justify-between items-center mb-4">
                  <p>Story progress</p>
                  <p><span className="text-green-500">{currentStory + 1} </span>of {userStories.length}</p>
                </div>
                <ProgressBar value={(((currentStory + 1) / userStories.length) * 100) || 0} color="bg-blue-500" />
              </div>
              <div className="bg-white w-full flex flex-col rounded-lg shadow-sm p-6 mb-8">
                <div className="flex w-full items-center justify-between mb-4">
                  <div className="flex gap-2 items-center">
                    <Icon name="play" size={16} color="#0368DB"/>
                    <p>New Story - Ready to Vote</p>
                  </div>
                  {revealed ? <Badge text="Completed" bgColor="bg-green-200" textColor="text-green-800" /> : <Badge text="Voting" textColor="text-orange-800" bgColor="bg-orange-200" animate />}
                </div>
                <div className="w-full bg-green-100 rounded-lg p-4 border-[1px] border-green-400">
                  <p className="text-gray-600">{userStories[currentStory]?.description}</p>
                </div>
              </div>
              {revealed && (
                <div className="bg-white w-full rounded-lg shadow-sm p-6 mb-8">
                  <div className="flex items-center gap-2">
                    <Icon name="chartPie" color="#0368DB" size={20} />
                    <p>Voting Results</p>
                  </div>
                  <div className="grid grid-cols-3 gap-4 mt-4">
                    <VoteResult vote={mostVoted} color="green" label="Most Voted" />
                    <VoteResult vote={averageVotes} toFixed={2} color="blue" label="Average" />
                    <VoteResult vote={Object.entries(votes || {}).length} color="purple" label="Total Votes" />
                  </div>
                  
                </div>
              )}
              <div className="bg-white w-full rounded-lg shadow-sm p-6">
                <div className="flex items-center gap-2">
                  <Icon name="groupOfUsers" color="#0368DB" size={20} />
                  <p>Individual Votes</p>
                </div>
                <div className="grid grid-cols-[repeat(auto-fit,minmax(100px,1fr))] gap-4 mt-4">
                  {playerUsers.length === 0 ? (
                    <div className="w-full flex items-center flex-col">
                      <Icon name="groupOfUsers" color="#D1D5DB" size={65} />
                      <h3 className="text-black text-2xl font-bold mt-2">Ready to Start Voting?</h3>
                      <p className="w-[45%] text-center mt-2">We need at least one player to begin the estimation process. Spectators can observe, but players cast the votes!</p>
                      <div className="w-full mt-4 mb-6 rounded-lg bg-yellow-100 p-5 py-10 flex flex-col items-center justify-center">
                        <h3 className="font-bold text-yellow-700 mb-5">How Planning Poker Works</h3>
                        <div className="w-full py-2 mt-4 grid lg:grid-cols-3 md:grid-cols-1">
                          <div className="flex flex-col items-center justify-center">
                            <div className="p-3 w-[170px] xl:w-[240px] flex mb-2 items-center justify-center bg-white rounded-lg">
                              <Icon name="handPointer" color="#0368DB" />
                            </div>
                            <p className="font-bold">Vote</p>
                            <p>Select story points</p>
                          </div>
                          <div className="flex items-center flex-col justify-center">
                            <div className="p-3 w-[170px] xl:w-[240px] mb-2 flex justify-center bg-white rounded-lg">
                              <Icon name="eye" color="#00A63E" />
                            </div>
                            <p className="font-bold">Reveal</p>
                            <p>See all estimates</p>
                          </div>
                          <div className="items-center flex-col flex justify-center">
                            <div className="p-3 w-[170px] xl:w-[240px] mb-2 flex justify-center bg-white rounded-lg">
                              <Icon name="discuss" color="#0368DB" />
                            </div>
                            <p className="font-bold">Discuss</p>
                            <p>Reach consensus</p>
                          </div>
                        </div>
                      </div>
                      <Button iconName="play" onClick={handleChangeRole} text="Become a Player & Start Voting" />
                      <div className="flex gap-5 mt-4 text-gray-500">
                        <div className="flex gap-2 text-sm items-center">
                          <Icon name="share" size={14} color="#0368DB" />
                          <p>Share room link with team</p>
                        </div>
                        <div className="flex gap-2 text-sm items-center">
                          <Icon name="clock" size={14} color="#F97316" />
                          <p>Waiting for players...</p>
                        </div>
                      </div>
                    </div>
                  ) : (
                    playerUsers.map((user, index) => {
                      const voteValue = revealed ? votes?.[user.username] : undefined;
                      let color: "green" | "yellow" | undefined = undefined;
                      if (revealed && voteValue && !isNaN(Number(voteValue))) {
                      const numericVotes = Object.values(votes || {})
                        .filter((v) => v !== '' && !isNaN(Number(v)))
                        .map(Number);
                        
                        const max = Math.max(...numericVotes);
                        const min = Math.min(...numericVotes);
                        const current = Number(voteValue);
                        if (current === max) color = "yellow";
                        else if (current === min) color = "green";
                      }
                      return (
                        <UserCardVotes
                          key={index}
                          isCurrentUser={user.username === username}
                          username={user.username}
                          vote={revealed ? votes?.[user.username] : undefined}
                          color={color}
                        />
                      )}
                    )
                  )}
                </div>
              </div>
              
              <div className="bg-white w-full rounded-lg shadow-sm p-6 mt-8">
                <div className="flex justify-between items-center mb-4">
                  <p>Voting session</p>
                  <p><span className="text-green-500">{votedUsers.size} </span>of {playerUsers.length} voted</p>
                </div>
                <ProgressBar value={((votedUsers.size / playerUsers.length) * 100) || 0} color="bg-green-500" />
              </div>
              <div className={`bg-white w-full rounded-lg shadow-sm p-6 mt-8 ${userIsSpectator || revealed ? "opacity-50 pointer-events-none" : ""}`}>
                <div className="flex items-center gap-2">
                  <p>Select Vote</p>
                </div>
                <div className={`grid grid-cols-[repeat(auto-fit,minmax(100px,1fr))] justify-items-center gap-2 mt-4`}>
                  {["1", "2", "3", "5", "8", "13", "21", "☕️"].map((value) => (
                    <Card
                      selectedCard={card}
                      value={value}
                      key={value}
                      onClick={() => submitVote(value)}
                    />
                  ))}
                </div>
              </div>
              {
                currentUser?.admin && (
                  <div className="bg-white w-full rounded-lg shadow-sm p-6 mt-8 flex gap-8">
                    <Button
                      backgroundColor="blue"
                      text={revealed ? "Revote" : "Reveal Votes"}
                      onClick={revealed ? resetVotes : revealVotes}
                      iconName={revealed ? "refresh" : "eye"}
                      full
                      disabled={votedUsers.size !== playerUsers.length || playerUsers.length === 0}
                    />
                    <Button
                      full
                      text={(currentStory + 1) >= userStories.length ? "Finish" : "Next Story"}
                      onClick={(currentStory + 1) >= userStories.length ? handleFinishSession : nextStory}
                      iconName="doubleArrowRight"
                      variant="secondary"
                      backgroundColor="green"
                      disabled={!revealed}
                    />
                  </div>
                )
              }
            </div>
          </div>
        </div>
      </div>
      <Footer />
      <JoinRoomModal
        onClose={() => router.push('/')}
        isOpen={isOpenModalJoinRoom}
        headerTitle="Join Room"
        headerDescription="Please provide your details to join the session."
        handlePress={joinRoom}
        handleCancel={() => router.push('/')}
      />
      <SessionCompleteModal
        onClose={handleCloseFinishModal}
        isOpen={roomIsFinished}
      />
    </>
  );
}
