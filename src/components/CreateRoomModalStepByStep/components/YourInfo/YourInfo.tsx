import Icon from "@/components/Icon/Icon"
import { Input } from "@/components/Input/Input"
import { UserRoleCard } from "@/components/UserRoleCard/UserRoleCard";
import { SetStateAction, useEffect, useState } from "react"
import { auth, provider } from "@/lib/firebase";
import { signOut, signInWithPopup, User } from "firebase/auth";
import { Alert } from "@/components/Alert/Alert";

interface IYourInfoProps {
  setName: React.Dispatch<SetStateAction<string>>;
  name: string;
}

export const YourInfo = ({
  setName,
  name
}: IYourInfoProps) => {
  const [isPlayer, setIsPlayer] = useState<boolean>(true);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((u) => setUser(u));
    return () => unsubscribe();
  }, []);

  const handleRoleChange = (role: "player" | "spectator") => {
    setIsPlayer(role === "player");
  };

  const handleSignIn = async () => {
    try {
      await signInWithPopup(auth, provider);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="px-6 flex flex-col mb-6">
      <div className="w-full flex items-end">
        <Input labelText="Your Name *" readOnly={!!user?.displayName} setValue={setName} value={user?.displayName || name} full />
        <button onClick={!!user ? handleSignOut : handleSignIn} className="ml-6 border-[1px] cursor-pointer hover:bg-black hover:text-white shadow-black border-black hover:shadow-md transition h-11 px-4 rounded-lg">
          <Icon size={16} name={!!user ? "logout" : "google"} />
        </button>
      </div>
      <div className="mt-6 flex flex-col gap-4">
        <p className="text-md text-black">Your role *</p>
        <div className="flex gap-4">
          <UserRoleCard testID="role-card-player" onPress={() => handleRoleChange("player")} active={isPlayer} type="Player" description="Vote on estimates" iconName="user" />
          <UserRoleCard testID="role-card-spectator" onPress={() => handleRoleChange("spectator")} active={!isPlayer} type="Spectator" description="Watch only" iconName="eye" />
        </div>
      </div>
      <div className="my-4">
        <Alert iconName="infoCircle" text="We'll use your name to display who votes in the sessions" />
      </div>
    </div>
  )
}