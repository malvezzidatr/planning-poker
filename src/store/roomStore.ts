import { SetStateAction } from "react";
import { create } from "zustand";
import { persist } from "zustand/middleware";

type Role = "player" | "spectator";

interface RoomSettings {
  enableTimer: boolean;
  timer: string;
}

interface RoomData {
  name: string;
  role: Role;
  userStories: string[];
  deck: string;
  settings: RoomSettings;
}

interface RoomStore extends RoomData {
  setName: (value: SetStateAction<string>) => void;
  setRole: (role: Role) => void;
  addUserStory: (story: string) => void;
  removeUserStory: (index: number) => void;
  setDeck: (deck: string) => void;
  toggleTimer: () => void;
  reset: () => void;
  setTimer: (value: SetStateAction<string>) => void;
}

export const useRoomStore = create<RoomStore>()(
  persist(
    (set) => ({
      name: "",
      role: "player",
      userStories: [],
      deck: "Fibonacci",
      settings: {
        enableTimer: false,
        timer: "60",
      },

      setName: (value) =>
        set((state) => ({
          name: typeof value === "function" ? value(state.name) : value,
        })),
      setRole: (role) => set({ role }),
      addUserStory: (story) =>
        set((state) => ({ userStories: [...state.userStories, story] })),
      removeUserStory: (index) =>
        set((state) => ({
          userStories: state.userStories.filter((_, i) => i !== index),
        })),
      setDeck: (deck) => set({ deck }),
      toggleTimer: () =>
        set((state) => ({
          settings: { ...state.settings, enableTimer: !state.settings.enableTimer },
        })),
      setTimer: (value) =>
        set((state) => ({
          settings: {
            ...state.settings,
            timer:
              typeof value === "function"
                ? value(state.settings.timer)
                : value,
          },
        })),
      reset: () =>
        set({
          name: "",
          role: "player",
          userStories: [],
          deck: "Fibonacci",
          settings: { enableTimer: false, timer: "60" },
        }),
    }),
    {
      name: "room-name-storage",
      partialize: (state) => ({ name: state.name }),
      onRehydrateStorage: () => (state) => {
        console.log("hydrated!")
      }
    }
  )
);
