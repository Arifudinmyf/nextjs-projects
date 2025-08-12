"use client";

import dynamic from "next/dynamic";

const UserList = dynamic(() => import("../user/user-page/user-list"), {
  ssr: false,
  loading: () => <p>Loading component...</p>,
});

export default function UserPage() {
  return (
    <div className="p-4">
      <UserList />
    </div>
  );
}
