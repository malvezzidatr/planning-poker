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
      <div className="min-h-screen bg-[#F9FAFB] px-24 flex">
        <div className="w-full mx-auto mt-28 text-black rounded-lg shadow-xs">
          <div className="bg-white p-6 rounded-lg shadow-md flex justify-between items-center">
            <p className="font-bold text-2xl">Room: <span className="text-blue-500 font-bold">{roomId}</span></p> 
            <Button onClick={copyLink} text="Copy room" iconName="copy" />
          </div>
          <div className="flex gap-8 mt-6">
            <div className="flex-col flex gap-8">
              <UsersOnline title="Players" users={playerUsers} votedUsers={votedUsers} username={username}>
                {userIsSpectator && (
                  <button onClick={handleChangeRole} className="flex gap-3 w-full items-center cursor-pointer transition justify-center text-center text-blue-500 hover:text-blue-700">
                    <Icon name="change" />
                    <p>Entrar como jogador</p>
                  </button>
                )}
              </UsersOnline>
              <UsersOnline title="Spectators" users={spectatorUsers} username={username}>
                {!userIsSpectator && (
                  <button onClick={handleChangeRole} className="flex gap-3 w-full items-center cursor-pointer transition justify-center text-center text-blue-500 hover:text-blue-700">
                    <Icon name="change" />
                    <p>Entrar como espectador</p>
                  </button>
                )}
              </UsersOnline>
            </div>
            
            <div className="flex-col w-full">
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
                <div className="grid grid-cols-3 gap-4 mt-4">
                  {playerUsers.map((user, index) => {
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
              <div className={`bg-white w-full rounded-lg shadow-sm p-6 mt-8 ${userIsSpectator ? "opacity-50 pointer-events-none" : ""}`}>
                <div className="flex items-center gap-2">
                  <p>Select Vote</p>
                </div>
                <div className={`flex justify-between mt-4`}>
                  {["1", "2", "3", "5", "8", "13", "21", "?"].map((value) => (
                    <Card
                      selectedCard={card}
                      value={value}
                      key={value}
                      onClick={() => submitVote(value)}
                    />
                  ))}
                </div>
              </div>
              <div className="bg-white w-full rounded-lg shadow-sm p-6 mt-8 flex gap-8">
                <Button
                  backgroundColor="blue"
                  text="Reveal Votes"
                  onClick={revealVotes}
                  iconName="eye"
                  full
                  disabled={votedUsers.size !== playerUsers.length || playerUsers.length === 0}
                />
                <Button
                  full
                  text="Reset Votes"
                  onClick={resetVotes}
                  iconName="refresh"
                  variant="secondary"
                  outlined
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <JoinRoomModal
        onClose={() => router.push('/')}
        isOpen={isOpenModalJoinRoom}
        headerTitle="Join Room"
        headerDescription="Please provide your details to join the session."
        handlePress={joinRoom}
        handleCancel={() => router.push('/')}
      />
    </>
  );
}
