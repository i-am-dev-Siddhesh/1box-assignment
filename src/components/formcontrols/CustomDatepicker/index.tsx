import { useState } from "react";

interface DatePickerProps {
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
    label?: string;
    required?: boolean;
    errorMessage?: string;
    isSubmitted?: boolean;
}

export default function CustomDatePicker({
    value,
    onChange,
    placeholder = "",
    label = "Date",
    required = false,
    errorMessage = "This field is required",
    isSubmitted = false,
}: DatePickerProps) {

    const showError = required && (isSubmitted) && value === "";

    return (
        <div className="w-full">
            <div
                className="relative"

            >
                <input
                    type="date"
                    className={`w-full text-gray-500 pl-3 pr-10 py-2 border rounded-md focus:outline-none focus:ring-2 bg-white ${showError
                        ? "border-red-500 focus:ring-red-200"
                        : "border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                        }`}
                    value={value}
                    onChange={(e) => {
                        onChange(e.target.value);
                    }}
                    required={required}
                />

                <label
                    className={`absolute left-3 transition-all px-1 pointer-events-none ${showError ? "text-red-500" : "text-gray-500"
                        }
               text-sm -top-3 bg-white
           `}
                >
                    {label} {required && <span className="text-red-500">*</span>}
                </label>

                {showError && (
                    <p className="mt-1 text-sm text-red-600">{errorMessage}</p>
                )}
            </div>
        </div>
    );
}