"use client";

import { FC } from "react";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) => {
  const maxVisiblePages = 5;

  const getPageNumbers = () => {
    let start = Math.max(currentPage - Math.floor(maxVisiblePages / 2), 1);
    let end = start + maxVisiblePages - 1;

    if (end > totalPages) {
      end = totalPages;
      start = Math.max(end - maxVisiblePages + 1, 1);
    }

    return Array.from({ length: end - start + 1 }, (_, i) => start + i);
  };

  return (
    <div className="flex gap-2 items-center pt-5">
      {/* Prev Button */}
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={`p-4 rounded-full border ${
          currentPage === 1
            ? "bg-none text-gray-400 cursor-not-allowed"
            : "bg-white text-blue-600 font-bold hover:bg-gray-100 cursor-pointer"
        }`}
      >
        <FaAngleLeft />
      </button>

      {/* Page Numbers */}
      {getPageNumbers().map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`px-4 py-2 rounded-full border ${
            page === currentPage
              ? "bg-gray-300 text-gray-600 font-bold cursor-not-allowed px-6 py-4"
              : "bg-white text-blue-600 hover:bg-gray-100 cursor-pointer"
          }`}
        >
          {page}
        </button>
      ))}

      {/* Next Button */}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={`p-4 rounded-full border ${
          currentPage === totalPages
            ? "bg-none text-gray-400 cursor-not-allowed"
            : "bg-white text-blue-600 font-bold hover:bg-gray-100 cursor-pointer"
        }`}
      >
        <FaAngleRight />
      </button>
    </div>
  );
};

export default Pagination;
