import { Button } from "../Button/Button";
import Icon from "../Icon/Icon";

interface ISessionCompleteModal {
  isOpen: boolean;
  onClose?: () => void;
}

export const SessionCompleteModal = ({
  isOpen,
  onClose
}: ISessionCompleteModal) => {
  if (!isOpen) return
  return (
    <div
      style={{backgroundColor: "rgba(0, 0, 0, 0.5)"}}
      className="fixed inset-0 flex-col justify-center items-center z-50 flex"
    >
      <div className="bg-white relative text-black rounded-lg shadow-lg flex flex-col items-center overflow-scroll h-[700px] w-[750px]">
        <div className="flex items-center flex-col p-6 w-full">
          <div className="p-6 bg-blue-100 rounded-full mb-4">
            <Icon name="check" />
          </div>
          <h3 className="mb-2 text-2xl">Session Complete!</h3>
          <p className="text-gray-500">Great job! You&apos;ve successfully estimated all user stories.</p>
          <div className="w-full bg-blue-100 p-6 rounded-lg mt-10">
            <h4 className="mb-5">Session Summary</h4>
            <div className="flex items-center justify-between px-18">
              <div className="flex flex-col items-center">
                <p className="text-3xl">12</p>
                <p className="text-sm">Stories estimated</p>
              </div>
              <div className="flex flex-col items-center">
                <p className="text-3xl">2h15</p>
                <p className="text-sm">Total Time</p>
              </div>
            </div>
            <div className="flex items-center justify-between mt-6 px-18">
              <div className="flex flex-col items-center">
                <p className="text-3xl">89 pts</p>
                <p className="text-sm">Total Story Points</p>
              </div>
              <div className="flex flex-col items-center">
                <p className="text-3xl">8</p>
                <p className="text-sm">Participants</p>
              </div>
            </div>
          </div>
          <div className="flex flex-col w-full mt-10">
            <h4>Team</h4>
            <div className="flex mt-4 w-full p-4 bg-blue-100 rounded-lg">
              <Icon name="user" />
              <p className="ml-6">Nome</p>
            </div>
          </div>
        </div>
        <div className="w-full sticky mt-10 bottom-0 p-6 flex items-center">
          <Button iconName="handPointer" onClick={() => {}} text="Start New Session" full />
          <button onClick={onClose} className="p-3 rounded-lg ml-10 bg-gray-200 hover:opacity-75 transition cursor-pointer">
            <Icon name="close" />
          </button>
        </div>
      </div>
    </div>
  )
}