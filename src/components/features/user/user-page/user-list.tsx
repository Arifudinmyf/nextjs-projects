"use client";

import { useFetch } from "@/hooks/useApi";
import { useState, useEffect } from "react";
import { User } from "../model/user.model";
import { useRouter, useSearchParams } from "next/navigation";

export default function UserList() {
  const { data, loading, error, refetch } = useFetch<undefined, User>(
    "/users",
    { method: "GET" }
  );

  const router = useRouter();
  const searchParams = useSearchParams();

  const limit = Number(searchParams.get("limit")) || 5;
  const [page, setPage] = useState(Number(searchParams.get("page")) || 0);
  const [search, setSearch] = useState(searchParams.get("search") || "");

  // Update URL Path
  const updateUrlParams = (newPage: number, newSearch: string) => {
    const sp = new URLSearchParams({
      page: newPage.toString(),
      limit: limit.toString(),
    });
    if (newSearch.trim()) {
      sp.set("search", newSearch.trim());
    }
    router.replace(`/v1/user?${sp.toString()}`);
  };

  // Fetch Data
  const fetchData = (pageNum: number, searchTerm: string) => {
    refetch({
      params: {
        limit,
        skip: pageNum * limit,
        q: searchTerm.trim() || undefined,
      },
    });
  };

  const handleSearch = () => {
    setPage(0);
    updateUrlParams(0, search); // langsung update URL
    fetchData(0, search);       // langsung fetch data
  };

  const handleNext = () => {
    if (data && page + 1 < Math.ceil((data.total ?? 0) / limit)) {
      const newPage = page + 1;
      setPage(newPage);
      updateUrlParams(newPage, search);
      fetchData(newPage, search);
    }
  };

  const handlePrev = () => {
    if (page > 0) {
      const newPage = page - 1;
      setPage(newPage);
      updateUrlParams(newPage, search);
      fetchData(newPage, search);
    }
  };

  // Load pertama kali sesuai URL
  useEffect(() => {
    fetchData(page, search);
  }, []);

  if (loading) return <p>Loading users...</p>;
  if (error) return <p className="text-red-500">Error: {String(error)}</p>;

  return (
    <div className="p-52">
      <h1 className="text-xl font-bold mb-4">User List</h1>

      <button
        onClick={() => router.push("/v1/user/add")}
        className="mb-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Add User
      </button>

      {/* Search field */}
      <div className="flex gap-2 mb-4">
        <input
          type="text"
          placeholder="Search user..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSearch()} // Enter juga bisa
          className="border px-3 py-2 rounded flex-1"
        />
        <button
          onClick={handleSearch}
          className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
        >
          Search
        </button>
      </div>

      {/* Data List */}
      <div className="space-y-2">
        {data?.users?.map((user) => (
          <div
            key={user.id}
            className="border border-gray-300 rounded p-2 hover:bg-gray-700"
          >
            <p className="font-medium">
              {user.firstName} {user.lastName}
            </p>
            <p className="text-sm text-gray-500">{user.email}</p>
            <p className="text-sm text-gray-500">{user.age}</p>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex items-center gap-2 mt-4">
        <button
          onClick={handlePrev}
          disabled={page === 0}
          className="px-4 py-2 bg-gray-400 text-white rounded disabled:opacity-50"
        >
          Prev
        </button>
        <span>
          Page {page + 1} of {data?.total ? Math.ceil(data.total / limit) : 1}
        </span>
        <button
          onClick={handleNext}
          disabled={data && page + 1 >= Math.ceil((data?.total ?? 0) / limit)}
          className="px-4 py-2 bg-gray-600 text-white rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
}
