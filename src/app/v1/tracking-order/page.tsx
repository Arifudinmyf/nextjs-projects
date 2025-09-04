"use client";

import TrackingOrder, { TrackingStep } from "@/components/features/tracking-order/TrackingOrder";

export default function Page() {
  const trackingSteps: TrackingStep[] = [
    {
      step: "Paket diterima di Kota Jakarta",
      status: "completed",
      description: "Paket sudah tiba di kota Jakarta dan siap dikirim ke kabupaten/kota tujuan.",
    },
    {
      step: "Paket dalam perjalanan ke Kabupaten Bandung",
      status: "completed",
      description: "Paket sedang dalam perjalanan menuju Kabupaten Bandung.",
    },
    {
      step: "Paket menuju Kecamatan Sukajadi",
      status: "in-progress",
      description: "Paket sedang diantar menuju Kecamatan Sukajadi.",
    },
    {
      step: "Paket sampai ke alamat tujuan",
      status: "pending",
      description: "Menunggu kurir mengantarkan ke alamat penerima.",
    },
  ];

  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-100">
      <TrackingOrder steps={trackingSteps} />
    </main>
  );
}
