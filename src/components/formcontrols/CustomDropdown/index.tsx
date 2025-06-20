import { useState } from "react";

interface CustomDropdownProps {
  value: string;
  onChange: (value: string) => void;
  options: string[];
  label: string;
  required?: boolean;
  errorMessage?: string;
  isSubmitted?: boolean;
}

export default function CustomDropdown({
  value,
  onChange,
  options,
  label,
  required = false,
  errorMessage = "This field is required",
  isSubmitted = false,
}: CustomDropdownProps) {
  const [isFocused, setIsFocused] = useState(false);
  const [isTouched, setIsTouched] = useState(false);

  const showFloatingLabel = isFocused || value !== "";
  const showError = required && (isTouched || isSubmitted) && value === "";

  return (
    <div className="relative">
      <div
        className="relative"
        onMouseDown={() => setIsFocused(true)}
        onMouseLeave={() => {
          setIsFocused(false);
          if (value === "") setIsTouched(true);
        }}
      >
        <select
          className={`w-full text-gray-500 appearance-none pl-${!value ? 16 : 3} pr-10 py-2 border rounded-md focus:outline-none focus:ring-2 bg-white ${showError
            ? "border-red-500 focus:ring-red-200"
            : "border-gray-300 focus:ring-blue-500 focus:border-blue-500"
            }`}
          value={value}
          onChange={(e) => {
            onChange(e.target.value);
            setIsTouched(true);
          }}
          required={required}
        >
          <option value="" hidden={!value}>
            Select an option
          </option>
          {options.map((option) => (
            <option key={option} value={option} className="text-gray-500">
              {option}
            </option>
          ))}
        </select>

        <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
          <svg
            className={`h-5 w-5 transition-transform duration-200 ${isFocused ? "rotate-180" : ""
              } ${showError ? "text-red-500" : "text-gray-400"}`}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </div>

        <label
          className={`absolute  transition-all px-1 pointer-events-none ${showError ? "text-red-500" : "text-gray-500"
            } ${showFloatingLabel
              ? "text-sm -top-3 left-3  bg-white"
              : "top-2 left-[0.5] pl-2.5 bg-white"
            }`}
        >
          {label || "Select an option "} {required && <span className="text-red-500">*</span>}
        </label>

      </div>
      {showError && (
        <p className="mt-1 absolute text-sm text-red-600">{errorMessage}</p>
      )}
    </div>
  );
}