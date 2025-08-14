"use client";

import { useFetch } from "@/hooks/useApi";
import { useState, useEffect } from "react";
import TableShared from "@/components/shared/table/SharedTable";
import { useRouter, useSearchParams } from "next/navigation";
import { User } from "../user/model/user.model";

export default function UserList() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Ambil query dari URL
  const [page, setPage] = useState(Number(searchParams.get("page")) || 1);
  const [limit] = useState(Number(searchParams.get("limit")) || 5);

  // Default null untuk sort
  const [sortField, setSortField] = useState<string | null>(
    searchParams.get("sortBy") || null
  );
  const [order, setOrder] = useState<"asc" | "desc" | null>(
    (searchParams.get("order") as "asc" | "desc") || null
  );

  const [totalPages, setTotalPages] = useState(1);

  const { data, loading, error, refetch } = useFetch<undefined, User>(
    "/v1/user", // path API backend
    { method: "GET" }
  );

  // Update URL sesuai state
  const updateUrlParams = (
    newPage: number,
    newSort: string | null,
    newOrder: "asc" | "desc" | null
  ) => {
    const params = new URLSearchParams();
    params.set("page", String(newPage));
    params.set("limit", String(limit));
    if (newSort) params.set("sortBy", newSort);
    if (newOrder) params.set("order", newOrder);
    router.replace(`/v1/user?${params.toString()}`);
  };

  // Fetch data dari API
  const fetchData = (
    newPage = page,
    newSort: string | null = sortField,
    newOrder: "asc" | "desc" | null = order
  ) => {
    updateUrlParams(newPage, newSort, newOrder);

    const queryParams: Record<string, any> = {
      page: newPage,
      limit,
    };
    if (newSort) queryParams.sortBy = newSort;
    if (newOrder) queryParams.order = newOrder;

    refetch({ params: queryParams });
  };

  // Trigger fetch saat page/sort berubah
  useEffect(() => {
    fetchData(page, sortField, order);
  }, [page, sortField, order]);

  // Hitung total halaman
  useEffect(() => {
    if (data?.total) {
      setTotalPages(Math.ceil(data.total / limit));
    }
  }, [data]);

  if (loading) return <p>Loading users...</p>;
  if (error) return <p className="text-red-500">Error: {JSON.stringify(error)}</p>;

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Users Table</h1>

      <TableShared
        data={data?.users || []}
        columns={[
          { key: "firstName", label: "First Name" },
          { key: "lastName", label: "Last Name" },
          { key: "email", label: "Email" },
        ]}
        currentSortField={sortField}
        currentOrder={order}
        onSortChange={(field, newOrder) => {
          setSortField(field);
          setOrder(newOrder);
          setPage(1); // reset page saat ganti sort
        }}
        currentPage={page}
        totalPages={totalPages}
        onPageChange={(newPage) => setPage(newPage)}
      />
    </div>
  );
}
