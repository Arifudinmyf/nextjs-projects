"use client";

import React from "react";

type InputElement = HTMLInputElement | HTMLTextAreaElement;

interface InputFieldProps<T extends InputElement> {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
  value: string;
  as?: "input" | "textarea";
  onChange: (e: React.ChangeEvent<T>) => void;
  disabled?: boolean;
  required?: boolean;
  error?: string;
}

const InputField = <T extends InputElement>({
  label,
  name,
  type = "text",
  placeholder,
  value,
  as = "input",
  onChange,
  disabled,
  required = false,
  error,
}: InputFieldProps<T>) => {
  return (
    <div className="flex flex-col space-y-1">
      {/* Label dengan tanda bintang jika required */}
      <label htmlFor={name} className="mb-1 text-sm font-medium text-gray-700">
        {label}{" "}
        {required && <span className="text-red-500">*</span>}
      </label>

      {as === "textarea" ? (
        <textarea
          id={name}
          name={name}
          placeholder={placeholder}
          value={value}
          onChange={onChange as (e: React.ChangeEvent<HTMLTextAreaElement>) => void}
          disabled={disabled}
          required={required}
          className={`rounded-md border p-2 text-sm focus:ring-2 focus:outline-none disabled:bg-gray-100 disabled:cursor-not-allowed ${
            error
              ? "border-red-500 focus:ring-red-500"
              : "border-gray-300 focus:ring-blue-500"
          }`}
        />
      ) : (
        <input
          id={name}
          name={name}
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange as (e: React.ChangeEvent<HTMLInputElement>) => void}
          disabled={disabled}
          required={required}
          className={`rounded-md border p-2 text-sm focus:ring-2 focus:outline-none disabled:bg-gray-100 disabled:cursor-not-allowed ${
            error
              ? "border-red-500 focus:ring-red-500"
              : "border-gray-300 focus:ring-blue-500"
          }`}
        />
      )}

      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  );
};

export default InputField;
