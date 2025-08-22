interface ISummaryProps {
  title: string;
  content: string[];
}

export const Summary = ({ title, content }: ISummaryProps) => {
  return (
    <nav className="w-[250px] bg-white shadow-lg p-5 rounded-lg">
      <h3 className="text-lg text-black font-bold mb-4">{title}</h3>
      <ul className="text-black">
        {content.map((item, index) => (
          <div key={item} className="flex items-center gap-2 mb-3 font-medium hover:text-blue-500 cursor-pointer">
            <span>{index + 1}.</span>
            <li key={index}>{item}</li>
          </div>
        ))}
      </ul>
    </nav>
  )
}