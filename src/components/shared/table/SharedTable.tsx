"use client";

import { FC } from "react";
import SortButton from "../sort/SortHeader";
import Pagination from "../pagination/Pagination";

interface TableProps<T> {
  data: T[];
  columns: { key: keyof T; label: string }[];
  currentSortField: string;
  currentOrder: "asc" | "desc";
  onSortChange: (field: string, order: "asc" | "desc") => void;
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const TableShared = <T extends object>({
  data,
  columns,
  currentSortField,
  currentOrder,
  onSortChange,
  currentPage,
  totalPages,
  onPageChange,
}: TableProps<T>) => {
  return (
    <div>
      <table className="w-full border border-gray-500">
        <thead className="bg-gray-400">
          <tr>
            {columns.map((col) => (
              <th key={String(col.key)} className="p-2 border">
                <SortButton
                  field={String(col.key)}
                  currentSortField={currentSortField}
                  currentOrder={currentOrder}
                  onSortChange={onSortChange}
                />
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.length > 0 ? (
            data.map((row, idx) => (
              <tr key={idx} className="hover:bg-gray-700">
                {columns.map((col) => (
                  <td key={String(col.key)} className="p-2 border">
                    {String(row[col.key])}
                  </td>
                ))}
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={columns.length} className="p-4 text-center">
                No Data
              </td>
            </tr>
          )}
        </tbody>
      </table>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={onPageChange}
      />
    </div>
  );
};

export default TableShared;
