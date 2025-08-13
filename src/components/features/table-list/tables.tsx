"use client";

import { useFetch } from "@/hooks/useApi";
import { useState, useEffect } from "react";
import TableShared from "@/components/shared/table/SharedTable";
import { useRouter, useSearchParams } from "next/navigation";
import { User } from "../user/model/user.model";
import LottieAnimation from "@/components/shared/Lottie-animation/LottieAnimation";

const animationData = require("@/public/lottie/document-hover-pinch.json");

export default function Tables() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Ambil default dari URL, atau fallback ke nilai awal
  const [page, setPage] = useState(Number(searchParams.get("page")) || 1);
  const [limit] = useState(Number(searchParams.get("limit")) || 5);
  const [sortField, setSortField] = useState(searchParams.get("sortBy") || "firstName");
  const [order, setOrder] = useState<"asc" | "desc">(
    (searchParams.get("order") as "asc" | "desc") || "asc"
  );
  const [totalPages, setTotalPages] = useState(1);

  const { data, loading, error, refetch } = useFetch<undefined, User>(
    "/users",
    { method: "GET" }
  );

  // Update URL Path sesuai perubahan
  const updateUrlParams = (newPage: number, newSort: string, newOrder: string) => {
    const params = new URLSearchParams();
    params.set("page", String(newPage));
    params.set("limit", String(limit));
    params.set("sortBy", newSort);
    params.set("order", newOrder);
    router.replace(`/v1/tables?${params.toString()}`);
  };

  // Fetch data API
  const fetchData = (newPage = page, newSort = sortField, newOrder = order) => {
    updateUrlParams(newPage, newSort, newOrder);
    refetch({
      params: {
        limit,
        skip: (newPage - 1) * limit,
        sortBy: newSort,
        order: newOrder,
      },
    });
  };

  // Fetch ketika state berubah
  useEffect(() => {
    fetchData();
  }, [page, sortField, order]);

  // Hitung total pages
  useEffect(() => {
    if (data?.total) {
      setTotalPages(Math.ceil(data.total / limit));
    }
  }, [data]);

  if (loading) return <p>Loading users...</p>;
  if (error) return <p className="text-red-500">Error: {String(error)}</p>;

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Users Table</h1>
      <LottieAnimation animationData={animationData} />

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
          setPage(1); // reset ke page 1 saat ganti sort
        }}
        currentPage={page}
        totalPages={totalPages}
        onPageChange={(newPage) => {
          setPage(newPage);
        }}
      />
    </div>
  );
}
