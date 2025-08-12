"use client";

import { useFetch } from "@/hooks/useApi";
import { useState } from "react";
import { User } from "../model/user.model";
import { useRouter } from "next/navigation";

interface UserCreateRequest {
  firstName: string;
  lastName: string;
  age: number;
  email: string;
  // tambahkan properti lain sesuai API jika perlu
}

export default function AddUserForm() {
  const router = useRouter();
  const [form, setForm] = useState<UserCreateRequest>({
    firstName: "",
    lastName: "",
    age: 0,
    email: "",
  });

  const { loading, error, data, refetch } = useFetch<UserCreateRequest, User>(
    "/users/add",
    {
      method: "POST",
    }
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: name === "age" ? Number(value) : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await refetch({ req: form });
    router.push("/v1/user");
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">Error: {String(error)}</p>;

  return (
    <div className="max-w-md mx-auto p-4">
      <h2 className="text-xl font-bold mb-4">Add New User</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-semibold mb-1" htmlFor="firstName">
            First Name
          </label>
          <input
            id="firstName"
            name="firstName"
            value={form.firstName}
            onChange={handleChange}
            type="text"
            required
            className="w-full border px-3 py-2 rounded"
          />
        </div>

        <div>
          <label className="block font-semibold mb-1" htmlFor="lastName">
            Last Name
          </label>
          <input
            id="lastName"
            name="lastName"
            value={form.lastName}
            onChange={handleChange}
            type="text"
            required
            className="w-full border px-3 py-2 rounded"
          />
        </div>

        <div>
          <label className="block font-semibold mb-1" htmlFor="age">
            Age
          </label>
          <input
            id="age"
            name="age"
            value={form.age}
            onChange={handleChange}
            type="number"
            required
            min={0}
            className="w-full border px-3 py-2 rounded"
          />
        </div>

        <div>
          <label className="block font-semibold mb-1" htmlFor="email">
            Email
          </label>
          <input
            id="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            type="email"
            required
            className="w-full border px-3 py-2 rounded"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 text-white px-4 py-2 rounded disabled:bg-blue-300"
        >
          {loading ? "Saving..." : "Add User"}
        </button>
      </form>

      {data && (
        <ul>
          {data?.users?.map((user) => (
            <li key={user.id}>
              User added successfully! ID: {user.id}, Name: {user.firstName}{" "}
              {user.lastName}
            </li>
          ))}
        </ul>
      )}
      
    </div>
  );
}
