"use client";

import { FC } from "react";
import { FaAngleDown, FaAngleUp } from "react-icons/fa6";

interface SortButtonProps {
  field: string;
  currentSortField: string | null;
  currentOrder: "asc" | "desc" | null;
  onSortChange: (field: string | null, order: "asc" | "desc" | null) => void;
}

const SortButton: FC<SortButtonProps> = ({
  field,
  currentSortField,
  currentOrder,
  onSortChange,
}) => {
  const isActive = currentSortField === field;

  const toggleOrder = () => {
    if (!isActive) {
      // belum aktif → aktif asc
      onSortChange(field, "asc");
    } else if (currentOrder === "asc") {
      // asc → desc
      onSortChange(field, "desc");
    } else if (currentOrder === "desc") {
      // desc → null (hapus sort)
      onSortChange(null, null);
    }
  };

  return (
    <button
      onClick={toggleOrder}
      className="px-2 py-1 text-sm cursor-pointer flex items-center gap-1"
    >
      <span>{field}</span>
      {isActive && currentOrder === "asc" && <FaAngleUp />}
      {isActive && currentOrder === "desc" && <FaAngleDown />}
    </button>
  );
};

export default SortButton;
