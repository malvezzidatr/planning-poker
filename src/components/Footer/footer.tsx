import Icon from "../Icon/Icon"

export const Footer = () => {
  return (
    <div className="bg-[#F3F8FE] px-20 flex justify-between items-center py-6 border-t border-gray-200">
      <p className="text-gray-600 text-sm">© 2025 Planning Poker App. All rights reserved.</p>
      <div className="flex gap-4">
        <a href="">
          <Icon name="github" color="#6B7280"/>
        </a>
        <a href="">
          <Icon name="linkedin" color="#6B7280"/>
        </a>
      </div>
    </div>
  )
}