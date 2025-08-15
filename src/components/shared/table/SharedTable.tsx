"use client";

import SortButton from "../sort/SortHeader";
import Pagination from "../pagination/Pagination";

interface TableColumn<T> {
  key: keyof T;
  label: string;
  sortable?: boolean;
}

interface TableProps<T> {
  data: T[];
  columns: TableColumn<T>[];
  currentSortField: string | null;
  currentOrder: "asc" | "desc" | null;
  onSortChange: (field: string | null, order: "asc" | "desc" | null) => void;
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
              <th
                key={String(col.key)}
                className="p-2 px-6 border whitespace-nowrap"
              >
                <div className="flex items-center gap-1">
                  {col.sortable && (
                    <SortButton
                      field={String(col.key)}
                      label={col.label}
                      currentSortField={currentSortField}
                      currentOrder={currentOrder}
                      onSortChange={onSortChange}
                      className="w-full"
                    />
                  )}
                  {!col.sortable && <span>{col.label}</span>}
                </div>
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
                    {row[col.key] ? String(row[col.key]) : '-'}
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
