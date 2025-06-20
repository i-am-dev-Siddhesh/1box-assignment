import { ReactNode, useState } from "react";
import { IconType } from "react-icons";

interface CustomCheckboxProps {
  value: boolean;
  onChange: (value: boolean) => void;
  label?: string;
  required?: boolean;
  errorMessage?: string;
  isSubmitted?: boolean;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  id?: string;
}

export default function CustomCheckbox({
  value = false,
  onChange,
  label = "Checkbox",
  required = false,
  errorMessage = "This field is required",
  isSubmitted = false,
  leftIcon,
  rightIcon,
  id = "checkbox",
}: CustomCheckboxProps) {
  const [isTouched, setIsTouched] = useState(false);
  const showError = required && (isTouched || isSubmitted) && !value;
    // Helper function to render icons
  const renderIcon = (icon: IconType | ReactNode) => {
    if (typeof icon === 'function') {
      const IconComponent = icon;
      return <IconComponent className="h-5 w-5 text-gray-400" />;
    }
    return icon;
  };
  console.log('leftIcon',leftIcon);
  
  return (
    <div className="relative flex items-start">
      {/* Left Icon */}
     {leftIcon && (
        <div className="absolute border-r-1 border-gray-300 z-2 h-full flex items-center justify-center pl-3 pr-3 ml-2 pointer-events-none">
          {renderIcon(leftIcon)}
        </div>
      )}

      <div className={`flex gap-2 justify-between cursor-pointer w-full text-gray-500 py-2 border rounded-md focus:outline-none focus:ring-2 bg-white ${leftIcon ? "pl-15" : "pl-3"
        } ${rightIcon ? "pr-10" : "pr-3"} ${showError
          ? "border-red-500 focus:ring-red-200"
          : "border-gray-300 focus:ring-blue-500 focus:border-blue-500"
        }`}>
        <label
          htmlFor={id}
          className={`ml-2 block cursor-pointer text-sm ${showError ? "text-red-500" : "text-gray-500"}`}
        >
          {label}
        </label>
        <input
          id={id}
          type="checkbox"
          checked={value}
          onChange={(e) => {
            onChange(e.target.checked);
            setIsTouched(true);
          }}
          onBlur={() => setIsTouched(true)}
          className={`h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 ${showError ? "border-red-500" : ""
            }`}
        />

      </div>

      {/* Right Icon */}
      {rightIcon && (
        <div className="absolute border-r-1 border-gray-300 z-2 h-full flex items-center justify-center pl-3 pr-3 ml-2 pointer-events-none">
          {renderIcon(rightIcon)}
        </div>
      )}

      {showError && (
        <p className="mt-1 text-sm text-red-600">{errorMessage}</p>
      )}
    </div>
  );
}