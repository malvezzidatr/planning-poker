"use client";

import { useEffect, useState } from "react";
import socket from "@/lib/socket";

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
  const [userStories, setUserStories] = useState<{ description: string }[]>([]);
  const [currentStory, setCurrentStory] = useState<number>(0);
  const [roomIsFinished, setRoomIsFinished] = useState<boolean>(false);

  useEffect(() => {
    const storedUsername = localStorage.getItem("username");
    const role = localStorage.getItem("role");
    const lastRoom = localStorage.getItem("room");
    const stories = JSON.parse(localStorage.getItem("userStories") || "[]");
    const isAdmin = localStorage.getItem(`admin_${roomId}`) === "true";

    if (storedUsername && roomId === lastRoom) {
      setUsername(storedUsername);
      socket.emit("joinRoom", { roomId, username: storedUsername, role, admin: isAdmin });

      if (stories.length > 0) {
        socket.emit("addUserStories", { roomId, userStories: stories });
      }
    } else {
      setIsOpenModalJoinRoom(true);
      setIsLoading(false);
    }
  }, [roomId]);

  useEffect(() => {
    const handleUserStoriesUpdate = (stories: { description: string }[]) => {
      setUserStories(stories);
      localStorage.setItem("userStories", JSON.stringify(stories));
    };

    socket.on("userStoriesUpdate", handleUserStoriesUpdate);

    return () => {
      socket.off("userStoriesUpdate", handleUserStoriesUpdate);
    };
  }, []);

  useEffect(() => {
    socket.on("roomState", ({ revealed: revealedFromServer, votes: votesFromServer }) => {
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
      socket.off("roomState");
    };
  }, [username]);

  useEffect(() => {
    const handleRoomUpdate = (users: User[]) => {
      setUsers(users);
      setIsLoading(false);
    };

    socket.on("roomUpdate", handleRoomUpdate);

    return () => {
      socket.off("roomUpdate", handleRoomUpdate);
    };
  }, []);

  useEffect(() => {
    return () => {
      socket.emit("leaveRoom");
    };
  }, []);

  useEffect(() => {
    socket.on("revealVotes", ({ votes: voteMap, average, mostVoted }) => {
      setVotes(voteMap);
      setRevealed(true);
      setAverageVotes(Number(average));
      setMostVoted(mostVoted);
    });

    socket.on("resetVotes", () => {
      setVotes(null);
      setCard("");
      setRevealed(false);
      setVotedUsers(new Set());
      localStorage.removeItem("card");
    });

    socket.on("userVoted", (user: string) => {
      setVotedUsers((prev) => new Set(prev).add(user));
    });

    return () => {
      socket.off("roomUpdate");
      socket.off("revealVotes");
      socket.off("resetVotes");
      socket.off("userVoted");
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

    socket.on("votesUpdate", handleVotesUpdate);

    return () => {
      socket.off("votesUpdate", handleVotesUpdate);
    };
  }, [username, card]);

  const submitVote = (value: string) => {
    setCard(value);
    localStorage.setItem("card", value);
    socket.emit("vote", { roomId, username, card: value });
  };

  const revealVotes = () => {
    socket.emit("reveal", roomId);
  };

  const resetVotes = () => {
    socket.emit("reset", roomId);
  };

  const handleChangeRole = () => {
    socket.emit("changeUserRole", { roomId, username })
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
    socket.emit("changeUsername", { roomId, oldUsername: username, newUsername });
    setShowUserModal(false);
  };

  const joinRoom = (username: string, role: "player" | "spectator") => {
    localStorage.setItem("username", username);
    localStorage.setItem("room", roomId as string);
    localStorage.setItem("role", role);
    setUsername(username);
    socket.emit("joinRoom", { roomId: roomId, username, role });
    setIsOpenModalJoinRoom(false);
  };

  const nextStory = () => {
    setCurrentStory(prev => prev + 1);
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
  };
}
