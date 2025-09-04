"use client";

import { useEffect } from "react";
import { FcCancel, FcHighPriority, FcInfo, FcOk } from "react-icons/fc";
import { IoIosCloseCircle } from "react-icons/io";
import { PiWarningFill } from "react-icons/pi";

interface SnackbarProps {
  message: string;
  isOpen: boolean;
  onInfoButtonClick: () => void;
  duration?: number; // default 3 detik
  type?: "success" | "error" | "info" | "warning";
}

export default function Snackbar({
  message,
  isOpen,
  onInfoButtonClick,
  duration = 3000,
  type = "info",
}: SnackbarProps) {
  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        onInfoButtonClick();
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [isOpen, duration, onInfoButtonClick]);

  if (!isOpen) return null;

  const typeStyle = {
    success: "bg-green-200 border-green-500 text-black",
    error: "bg-red-200 border-red-500 text-black",
    info: "bg-blue-200 border-blue-500 text-black",
    warning: "bg-yellow-200 border-yellow-500 text-black",
  };

  const typeIcon = {
    success: (<FcOk className=" w-6 h-6" />),
    error: (<IoIosCloseCircle className="text-red-500  w-6 h-6" />),
    info: (<FcInfo className=" w-6 h-6" />),
    warning: (<PiWarningFill className="text-yellow-500" />),
  };

  return (
    <div className="fixed top-5 left-1/2 transform -translate-x-1/2 z-50 w-[30rem]">
      <div
        className={`flex items-center justify-between gap-3 px-4 py-3 rounded-xl border-2 shadow-lg min-w-[250px] transition-all duration-300 ${typeStyle[type]}`}
      >
        <span>{message}</span>
        <button
          onClick={onInfoButtonClick}
          className="p-1 rounded-full hover:bg-white/20 transition"
          aria-label="Close snackbar"
        >
          {typeIcon[type]}
        </button>
      </div>
    </div>
  );
}
