"use client";

import { useState } from "react";
import Snackbar from "@/components/features/snackbar/Snackbar";

export default function HomePage() {
  const [open, setOpen] = useState(false);
  const [type, setType] = useState<"success" | "error" | "info" | "warning">(
    "success"
  );

  // Message disimpan sesuai type
  const getMessage = () => {
    switch (type) {
      case "success":
        return "Data berhasil disimpan! lorem ipsum dolor sit amet. consectetur adipiscing elit. sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.";
      case "error":
        return "Terjadi kesalahan!";
      case "info":
        return "Ini adalah pesan informasi.";
      case "warning":
        return "Perhatikan, ini peringatan.";
      default:
        return "";
    }
  };

  // Fungsi untuk show snackbar dengan type dinamis
  const showSuccessSnackbar = () => {
    setType("success");
    setOpen(true);
  };

  // Fungsi untuk show snackbar dengan type dinamis
  const showInfoSnackbar = () => {
    setType("info");
    setOpen(true);
  };

  // Fungsi untuk show snackbar dengan type dinamis
  const showWarningSnackbar = () => {
    setType("warning");
    setOpen(true);
  };

  const showErrorSnackbar = () => {
    setType("error");
    setOpen(true);
  };

  // Fungsi untuk close snackbar
  const handleCloseSnackbar = () => {
    setOpen(false);
  };

  return (
    <main className="flex flex-col items-center justify-center h-screen gap-4">
      <button
        className="bg-green-600 text-white px-4 py-2 rounded-xl hover:bg-green-700 transition"
        onClick={showSuccessSnackbar}
      >
        Show Success Snackbar
      </button>

      <button
        className="bg-blue-600 text-white px-4 py-2 rounded-xl hover:bg-blue-700 transition"
        onClick={showInfoSnackbar}
      >
        Show Info Snackbar
      </button>

      <button
        className="bg-yellow-600 text-white px-4 py-2 rounded-xl hover:bg-yellow-700 transition"
        onClick={showWarningSnackbar}
      >
        Show Warning Snackbar
      </button>
      
      <button
        className="bg-red-600 text-white px-4 py-2 rounded-xl hover:bg-red-700 transition"
        onClick={showErrorSnackbar}
      >
        Show Error Snackbar
      </button>

      <Snackbar
        message={getMessage()}
        isOpen={open}
        onInfoButtonClick={handleCloseSnackbar}
        type={type}
      />

    </main>
  );
}
