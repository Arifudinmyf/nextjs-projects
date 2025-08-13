"use client";

import dynamic from "next/dynamic";

const Tables = dynamic(() => import("./tables"), {
  ssr: false,
  loading: () => <p>Loading component...</p>,
});

export default function UserPage() {
  return (
    <div className="p-4">
      <Tables />
    </div>
  );
}