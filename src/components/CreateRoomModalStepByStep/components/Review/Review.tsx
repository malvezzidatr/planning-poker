import Icon from "@/components/Icon/Icon"
import { Input } from "@/components/Input/Input"
import { useRoomStore } from "@/store/roomStore";

export const Review = () => {
  const fibonacci = ["0", "1", "2", "3", "5", "8", "13", "21", "?"];
  const { name, role, userStories, deck, settings } = useRoomStore();
  console.log(settings);
  return (
    <div className="flex flex-col w-full items-center px-6 overflow-y-auto pb-8">
      <p>Review your room settings</p>
      <p className="text-sm text-gray-700 mt-1">Check everything looks good before creating your room</p>
      <div className="w-full flex flex-col gap-2">
        <div className="border border-gray-900 mt-6 flex flex-col p-4 w-full rounded-lg">
          <div className="flex items-center justify-between mb-3">
            <div className="flex gap-2 items-center">
              <Icon name="user" size={14} />
              <p className="text-sm">Host information</p>
            </div>
          </div>
          <div className="flex items-center justify-between mb-2">
            <p className="text-gray-700">Name:</p>
            <p className="font-bold">{name}</p>
          </div>
          <div className="flex items-center justify-between">
            <p className="text-gray-700">Role:</p>
            <p className="font-bold">{role}</p>
          </div>
        </div>
        <div className="border border-gray-900 mt-6 flex flex-col p-4 w-full rounded-lg">
          <div className="flex items-center justify-between mb-3">
            <div className="flex gap-2 items-center">
              <Icon name="list" size={14} />
              <p className="text-sm">User stories</p>
            </div>
          </div>
          <div className="w-full flex justify-between items-center mb-2">
            <p className="text-gray-700">Total stories</p>
            <p>{userStories.length} stories</p>
          </div>
          <div className="flex flex-col gap-2">
            <p className="text-xs">Preview:</p>
            {userStories.map(story => (
              <Input key={story} value={story} readOnly setValue={() => {}} />
            ))}
          </div>
        </div>
        <div className="border border-gray-900 mt-6 flex flex-col p-4 w-full rounded-lg">
          <div className="flex items-center justify-between mb-3">
            <div className="flex gap-2 items-center">
              <Icon name="layerGroup" size={14} />
              <p className="text-sm">Deck & settigs</p>
            </div>
          </div>
          <div className="w-full flex justify-between items-center mb-2">
            <p className="text-gray-700">Deck:</p>
            <p>{deck}</p>
          </div>
          <div className="flex flex-wrap gap-2.5 mt-3.5">
            {fibonacci.map((num) => (
              <div className="px-2 py-1 bg-gray-100 border-black border-[1px] shadow-white flex rounded-md shadow-xs" key={num}>
                <span className="text-[#374151] text-sm font-bold">{num}</span>
              </div>
            ))}
          </div>
          {
            settings.enableTimer && (
              <div className="mt-4">
                <p className="mb-1 text-sm">Active settings:</p>
                  <div className="flex items-center gap-2">
                    <Icon size={12} name="check" />
                    <p className="text-xs">Allow timer</p>
                  </div>
              </div>
            )
          }
        </div>
      </div>
    </div>
  )
}