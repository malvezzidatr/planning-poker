interface ProgressBarProps {
  value: number;
  color?: string;
}

export const ProgressBar = ({ value, color = "bg-blue-500" }: ProgressBarProps) => {
  const clampedValue = Math.min(100, Math.max(0, value));

  return (
    <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
      <div
        className={`h-full rounded-full ${color} transition-all duration-300`}
        style={{ width: `${clampedValue}%` }}
      />
    </div>
  );
};
