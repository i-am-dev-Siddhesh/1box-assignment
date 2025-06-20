import { ReactNode, useState } from "react";

interface CustomInputProps {
  value: string;
  onChange: (value: string) => void;
  type?: string;
  placeholder?: string;
  label?: string;
  required?: boolean;
  errorMessage?: string;
  isSubmitted?: boolean;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
}

export default function CustomInput({
  value,
  onChange,
  type = "text",
  placeholder = "",
  label = "Input",
  required = false,
  errorMessage = "This field is required",
  isSubmitted = false,
  leftIcon,
  rightIcon,
}: CustomInputProps) {
  const [isFocused, setIsFocused] = useState(false);
  const [isTouched, setIsTouched] = useState(false);

  const showFloatingLabel = isFocused || value !== "";
  const showError = required && (isTouched || isSubmitted) && value === "";

  return (
    <div className="relative">
      {/* Left Icon */}
      {leftIcon && (
        <div className="absolute border-r-1 border-gray-300 z-2 h-full flex items-center justify-center pl-3 pr-3 ml-2 pointer-events-none">
          {leftIcon}
        </div>
      )}
      <div
        className="relative"
        onFocus={() => setIsFocused(true)}
        onBlur={() => {
          setIsFocused(false);
          if (value === "") setIsTouched(true);
        }}
      >


        <input
          className={`w-full text-gray-500 py-2 border rounded-md focus:outline-none focus:ring-2 bg-white ${leftIcon ? "pl-15" : "pl-3"
            } ${rightIcon ? "pr-10" : "pr-3"} ${showError
              ? "border-red-500 focus:ring-red-200"
              : "border-gray-300 focus:ring-blue-500 focus:border-blue-500"
            }`}
          value={value}
          onChange={(e) => {
            onChange(e.target.value);
            setIsTouched(true);
          }}
          placeholder={showFloatingLabel ? placeholder : ""}
          required={required}
        />


        <label
          className={`absolute left-3 transition-all px-1 pointer-events-none ${showError ? "text-red-500" : "text-gray-500"
            } ${showFloatingLabel
              ? "text-sm -top-3 bg-white"
              : "top-2 bg-white"
            } ${leftIcon ? "left-15" : ""}`}
        >
          {label} {required && <span className="text-red-500">*</span>}
        </label>

        {showError && (
          <p className="mt-1 text-sm text-red-600">{errorMessage}</p>
        )}
      </div>

      {rightIcon && (
        <div className="absolute inset-y-0 right-0 border-l-1 border-gray-300 z-2 h-full flex items-center justify-center pl-3 pr-3 ml-2 pointer-events-none">
          {rightIcon}
        </div>
      )}


    </div>
  );
}