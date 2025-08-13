"use client";

import dynamic from "next/dynamic";

const ProductList = dynamic(() => import("./productList"), {
  ssr: false,
  loading: () => <p>Loading component...</p>,
});

export default function Product() {
  return (
    <div className="p-4">
      <ProductList />
    </div>
  );
}