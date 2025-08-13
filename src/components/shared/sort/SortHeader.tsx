"use client";

import { FC } from "react";
import { FaAngleDown, FaAngleUp } from "react-icons/fa6";

interface SortButtonProps {
  field: string;
  currentSortField: string;
  currentOrder: "asc" | "desc" | null;
  onSortChange: (field: string, order: "asc" | "desc") => void;
}

const SortButton: FC<SortButtonProps> = ({
  field,
  currentSortField,
  currentOrder,
  onSortChange,
}) => {
  const isActive = currentSortField === field;

  const toggleOrder = () => {
    const newOrder = isActive && currentOrder === "asc" ? "desc" : "asc";
    onSortChange(field, newOrder);
  };

  return (
    <button onClick={toggleOrder} className="px-2 py-1 text-sm cursor-pointer">
      {isActive ? (
        <span className="flex items-center">
          {field} {currentOrder === "asc" ? <FaAngleUp /> : <FaAngleDown />}
        </span>
      ) : (
        field
      )}
    </button>
  );
};

export default SortButton;
