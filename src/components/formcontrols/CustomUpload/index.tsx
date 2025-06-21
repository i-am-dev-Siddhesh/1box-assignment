import { ReactNode, useState, useRef, ChangeEvent } from "react";
import { IconType } from "react-icons";

interface CustomUploadProps {
  value: File | File[] | null;
  onChange: (file: File | File[] | null) => void;
  label?: string;
  placeholder?: string;
  required?: boolean;
  errorMessage?: string;
  isSubmitted?: boolean;
  leftIcon?: ReactNode | IconType;
  rightIcon?: ReactNode | IconType;
  id?: string;
  accept?: string;
  multiple?: boolean;
  className?: string;
}

export default function CustomUpload({
  value = null,
  onChange,
  label = "Upload File",
  placeholder = "Choose a file...",
  required = false,
  errorMessage = "Please select a file",
  isSubmitted = false,
  leftIcon,
  rightIcon,
  id = "file-upload",
  accept = ".pdf,.png,.jpg,.jpeg",
  multiple = false,
  className = "",
}: CustomUploadProps) {
  const [isTouched, setIsTouched] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const showError = required && (isTouched || isSubmitted) && !value;

  const renderIcon = (icon: IconType | ReactNode) => {
    if (typeof icon === 'function') {
      const IconComponent = icon;
      return <IconComponent className="h-5 w-5 text-gray-400" />;
    }
    return icon;
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      onChange(multiple ? Array.from(files) : files[0]);
    } else {
      onChange(null);
    }
    setIsTouched(true);
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const displayText = () => {
    if (!value) return '';
    if (Array.isArray(value)) {
      return `${value.length} file${value.length !== 1 ? 's' : ''} selected`;
    }
    return value.name;
  };

  return (
    <div className={`relative ${className}`}>
      {/* Left Icon */}
       {leftIcon && (
        <div className="absolute border-r-1 border-gray-300 z-2 h-full flex items-center justify-center pl-3 pr-3  pointer-events-none">
          {renderIcon(leftIcon)}
        </div>
      )}

      {/* File Input Area */}
      <div
        className={`flex bg-[#fafafb] items-center justify-between w-full text-gray-500 py-2 px-3 border rounded-md cursor-pointer bg-white hover:bg-gray-50 transition-colors ${leftIcon ? "pl-12" : "pl-3"
          } ${rightIcon ? "pr-10" : "pr-3"
          } ${showError
            ? "border-red-500 focus:ring-red-200"
            : "border-gray-300 focus:ring-blue-500 focus:border-blue-500"
          }`}
        onClick={triggerFileInput}
      >
        <div className="truncate flex-1">
          <label
            htmlFor={id}
            className={`block text-sm ml-2 cursor-pointer ${showError ? "text-red-500" : "text-gray-500"
              }`}
          >
            {label}
          </label>
          <p className="text-xs text-gray-500 truncate">{displayText()}</p>
        </div>

        {/* Right Icon */}
        {rightIcon && (
          <div className="ml-2 pointer-events-none">
            {renderIcon(rightIcon)}
          </div>
        )}
      </div>

      {/* Hidden File Input */}
      <input
        id={id}
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept={accept}
        multiple={multiple}
        className="hidden"
      />

      {/* Error Message */}
      {showError && (
        <p className="mt-1 text-sm text-red-600">{errorMessage}</p>
      )}
    </div>
  );
}