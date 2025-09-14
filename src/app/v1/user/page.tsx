"use client";

import UserList from "@/components/features/user/user-page/user-list";
import React, { Suspense } from "react";

function Tables() {
  return <UserList />;
}

export default function page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Tables />
    </Suspense>
  );
}
