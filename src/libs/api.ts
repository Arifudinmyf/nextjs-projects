import axios from "axios";

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
if (!BASE_URL) {
  throw new Error("NEXT_PUBLIC_API_BASE_URL tidak ditemukan di .env.local");
}

export const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});
