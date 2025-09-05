"use client";

import { useEffect, useRef, useState } from "react";
import { useRoomStore } from "@/store/roomStore";
import { socketSSR } from "@/lib/socket";

type User = {
  username: string;
  role: "player" | "spectator";
  admin: boolean;
};

export function useRoom(roomId: string | string[] | undefined) {
  const [username, setUsername] = useState("");
  const [users, setUsers] = useState<User[]>([]);
  const [card, setCard] = useState("");
  const [votes, setVotes] = useState<Record<string, string> | null>(null);
  const [revealed, setRevealed] = useState(false);
  const [votedUsers, setVotedUsers] = useState<Set<string>>(new Set());
  const [copySuccess, setCopySuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [showUserModal, setShowUserModal] = useState(false);
  const [newUsername, setNewUsername] = useState("");
  const [isOpenModalJoinRoom, setIsOpenModalJoinRoom] = useState(false);
  const [averageVotes, setAverageVotes] = useState(0);
  const [mostVoted, setMostVoted] = useState(0);
  const [currentStory, setCurrentStory] = useState<number>(0);
  const [roomIsFinished, setRoomIsFinished] = useState<boolean>(false);
  const { name, userStories, settings } = useRoomStore();
  const [hydrated, setHydrated] = useState(false);
  const [stories, setStories] = useState<string[]>([]);
  const [timerDuration, setTimerDuration] = useState<number>(0);
  const [timerRunning, setTimerRunning] = useState<boolean>(false);
  const [timerStartedAt, setTimerStartedAt] = useState<number | null>(null);
  const [timeLeft, setTimeLeft] = useState<number>(0);
  const [currentStoryIndex, setCurrentStoryIndex] = useState(0);

  const intervalRef = useRef<NodeJS.Timeout | null>(null);


  useEffect(() => {
    socketSSR.on('userStoriesUpdate', (updatedStories: string[]) => {
      setStories(updatedStories);
    });

    socketSSR.on('currentStoryUpdate', (index: number) => {
      setCurrentStoryIndex(index);
    });

    return () => {
      socketSSR.off('userStoriesUpdate');
      socketSSR.off('currentStoryUpdate');
    };
  }, []);
  
  useEffect(() => {
    intervalRef.current = setInterval(() => {
      if (!timerStartedAt) return;
      const elapsed = Math.floor((Date.now() - timerStartedAt) / 1000);
      const remaining = Math.max(0, timerDuration - elapsed);
      setTimeLeft(remaining);
    }, 1000);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  useEffect(() => {
    const handleTimerState = (payload: { duration: number; running: boolean; startedAt: number | null; serverTime: number }) => {
      const offset = Date.now() - (payload.serverTime ?? Date.now());
      const duration = payload.duration ?? 0;
      const running = Boolean(payload.running);
      const startedAtClient = payload.startedAt ? payload.startedAt + offset : null;

      setTimerDuration(duration);
      setTimerRunning(running);
      setTimerStartedAt(startedAtClient);

      if (running && startedAtClient) {
        const elapsed = Math.floor((Date.now() - startedAtClient) / 1000);
        setTimeLeft(Math.max(0, duration - elapsed));
      } else {
        setTimeLeft(duration);
      }
    };

    socketSSR.on("timerState", handleTimerState);
    return () => {
      socketSSR.off("timerState", handleTimerState);
    };
  }, []);

  useEffect(() => {
    if (useRoomStore.getState().name) setHydrated(true);
    if (name === "") setHydrated(true);
    if (name) setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    const localName = localStorage.getItem("username");
    const finalUsername = name || localName;

    if (finalUsername) {
      setUsername(finalUsername);
      socketSSR.emit("joinRoom", {
        roomId,
        username: finalUsername,
        role: "player",
        admin: !localName && !!name,
        time: settings.enableTimer && Number(settings.timer),
        stories: userStories,
      });
      setIsLoading(false);
    } else {
      setIsOpenModalJoinRoom(true);
      setIsLoading(false);
    }
  }, [hydrated, name, roomId]);

  useEffect(() => {
    const handleUserStoriesUpdate = (stories: string[]) => {
      setStories(stories);
    };

    socketSSR.on("userStoriesUpdate", handleUserStoriesUpdate);

    return () => {
      socketSSR.off("userStoriesUpdate", handleUserStoriesUpdate);
    };
  }, []);

  useEffect(() => {

    socketSSR.on("roomState", ({ revealed: revealedFromServer, votes: votesFromServer }: { revealed: boolean; votes: Record<string, string>}) => {
      setRevealed(revealedFromServer);
      setVotes(votesFromServer);

      const voted = Object.entries(votesFromServer).filter(([_, value]) => value !== "");
      setVotedUsers(new Set(voted.map(([user]) => user)));

      if (votesFromServer[username]) {
        setCard(votesFromServer[username]);
        localStorage.setItem("card", votesFromServer[username]);
      }
    });

    return () => {
      socketSSR.off("roomState");
    };
  }, [username]);

  useEffect(() => {
    if (!roomId) return
    const handleRoomUpdate = (users: User[]) => {
      setUsers(users);
      setIsLoading(false);
    };

    socketSSR.on("roomUpdate", handleRoomUpdate);

    return () => {
      socketSSR.off("roomUpdate", handleRoomUpdate);
    };
  }, [roomId]);

  useEffect(() => {
    return () => {
      socketSSR.emit("leaveRoom");
    };
  }, []);

  useEffect(() => {
    socketSSR.on("revealVotes", ({ votes: voteMap, average, mostVoted }: { votes: Record<string, string>, average: string, mostVoted: number}) => {
      setVotes(voteMap);
      setRevealed(true);
      setAverageVotes(Number(average));
      setMostVoted(mostVoted);
    });

    socketSSR.on("resetVotes", () => {
      setVotes(null);
      setCard("");
      setRevealed(false);
      setVotedUsers(new Set());
      localStorage.removeItem("card");
    });

    socketSSR.on("userVoted", (user: string) => {
      setVotedUsers((prev) => new Set(prev).add(user));
    });

    return () => {
      socketSSR.off("roomUpdate");
      socketSSR.off("revealVotes");
      socketSSR.off("resetVotes");
      socketSSR.off("userVoted");
    };
  }, [roomId]);

  useEffect(() => {
    const handleVotesUpdate = (votes: Record<string, string>) => {
      setVotes(votes);
      const voted = Object.entries(votes).filter(([_, value]) => value !== "");
      setVotedUsers(new Set(voted.map(([user]) => user)));

      if (votes[username] && votes[username] !== card) {
        setCard(votes[username]);
        localStorage.setItem("card", votes[username]);
      }
    };

    socketSSR.on("votesUpdate", handleVotesUpdate);

    return () => {
      socketSSR.off("votesUpdate", handleVotesUpdate);
    };
  }, [username, card]);

  const submitVote = (value: string) => {
    setCard(value);
    localStorage.setItem("card", value);
    socketSSR.emit("vote", { roomId, username, card: value });
  };

  const revealVotes = () => {
    socketSSR.emit("reveal", roomId);
  };

  const resetVotes = () => {
    socketSSR.emit("reset", roomId);
  };

  const handleChangeRole = () => {
    socketSSR.emit("changeUserRole", { roomId, username })
    setVotes((prev) => {
      if (!prev) return prev;
      const newVotes = { ...prev, [username]: "" };
      return newVotes;
    });

    if (username) setCard("");
    setVotedUsers((prev) => {
      const newSet = new Set(prev);
      newSet.delete(username);
      return newSet;
    });
  }

  const copyLink = async () => {
    if (!window || !roomId) return;
    try {
      await navigator.clipboard.writeText(roomId as string);
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    } catch {
      // erro ao copiar
    }
  };

  const changeUsername = () => {
    if (!newUsername || newUsername.trim() === "") return;
    setUsername(newUsername);
    localStorage.setItem("username", newUsername);
    socketSSR.emit("changeUsername", { roomId, oldUsername: username, newUsername });
    setShowUserModal(false);
  };

  const joinRoom = (username: string, role: "player" | "spectator") => {
    localStorage.setItem("username", username);
    setUsername(username);
    socketSSR.emit("joinRoom", { roomId: roomId, username, role, admin: false });
    setIsOpenModalJoinRoom(false);
  };

  const nextStory = () => {
    setCurrentStory(prev => prev + 1);
    socketSSR.emit("nextStory", { roomId });
    resetVotes();
  }

  const handleFinishSession = () => {
    setRoomIsFinished(true);
  }

  const handleCloseFinishModal = () => {
    setRoomIsFinished(false);
  }

  const userIsSpectator = users.some(user => user.username === username && user.role === 'spectator');
  const playerUsers = users.filter(user => user.role === 'player');
  const spectatorUsers = users.filter(user => user.role === 'spectator');
  const currentUser = users.find(user => user.username === username);

  return {
    username,
    setUsername,
    users,
    card,
    votes,
    revealed,
    votedUsers,
    copySuccess,
    isLoading,
    isOpenModalJoinRoom,
    setIsOpenModalJoinRoom,
    averageVotes,
    mostVoted,
    newUsername,
    setNewUsername,
    showUserModal,
    setShowUserModal,
    submitVote,
    revealVotes,
    resetVotes,
    copyLink,
    joinRoom,
    changeUsername,
    playerUsers,
    spectatorUsers,
    userIsSpectator,
    handleChangeRole,
    currentUser,
    userStories,
    currentStory,
    nextStory,
    handleFinishSession,
    roomIsFinished,
    handleCloseFinishModal,
    stories,
    hasTimer: timerDuration > 0,
    time: timerDuration || Number(settings.timer),
    timerRunning,
    timerStartedAt,
    timeLeft,
    socket: socketSSR,
    currentStoryIndex,
  };
}
