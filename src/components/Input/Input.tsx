import React, { forwardRef } from "react";
import Icon, { IconName } from "../Icon/Icon";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
  labelText?: string;
  full?: boolean;
  iconName?: IconName;
  onClickIcon?: () => void;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(({
  value,
  setValue,
  placeholder,
  labelText,
  full,
  iconName,
  onClickIcon,
  ...props
}, ref) => {
  return (
    <div className={`flex flex-col bg-red-50 ${full && 'w-full'} rounded-lg`}>
      {labelText && <p className="text-md text-black mb-2">{labelText}</p>}
      <div className={`pr-4 py-3 ${props.readOnly ? 'bg-gray-100 text-white' : 'bg-white'} border-gray-900 shadow-md flex items-center rounded-lg justify-between border-[1px] ${full && 'w-full'}`}>
        <input
          {...props}
          ref={ref}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder={placeholder}
          className="w-full h-full px-4 placeholder:text-gray-500 outline-0 font-bold text-sm"
        />
        {iconName && (
          <button onClick={onClickIcon} className="flex items-center justify-center h-full">
            <Icon className="cursor-pointer" name={iconName} size={14} color="#0067DA" />
          </button>
        )}
      </div>
    </div>
  )
});
