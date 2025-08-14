import { FaArrowUp, FaArrowDown, FaArrowRightArrowLeft } from "react-icons/fa6";

interface SortButtonProps {
  field: string;
  label: string;
  currentSortField: string | null;
  currentOrder: "asc" | "desc" | null;
  onSortChange: (field: string, order: "asc" | "desc" | null) => void;
  className?: string;
}

export default function SortButton({
  field,
  label,
  currentSortField,
  currentOrder,
  onSortChange,
  className = "",
}: SortButtonProps) {
  const isActive = currentSortField === field;

  const handleClick = () => {
    if (!isActive) {
      onSortChange(field, "asc");
    } else if (currentOrder === "asc") {
      onSortChange(field, "desc");
    } else if (currentOrder === "desc") {
      onSortChange(field, null); // kembali ke default
    } else {
      onSortChange(field, "asc");
    }
  };

  let icon;
  if (!isActive || currentOrder === null) {
    icon = <FaArrowRightArrowLeft className="rotate-90" />;
  } else if (currentOrder === "asc") {
    icon = <FaArrowUp />;
  } else {
    icon = <FaArrowDown />;
  }

  return (
    <button onClick={handleClick} className={`flex justify-between items-center cursor-pointer ${className}`}>
      <span>{label}</span>
      {icon}
    </button>
  );
}
