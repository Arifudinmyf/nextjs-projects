"use client";

import { IoIosTimer } from "react-icons/io";
import { IoCheckmarkDoneOutline, IoCloseCircleOutline } from "react-icons/io5";

export interface TrackingStep {
  step: string;
  status: "completed" | "in-progress" | "pending" | "failed";
  description: string;
}

interface TrackingOrderProps {
  steps: TrackingStep[];
}

// Fungsi helper untuk mendapatkan warna garis
function getLineColor(status: TrackingStep["status"]) {
  switch (status) {
    case "completed":
      return "bg-green-500";
    case "failed":
      return "bg-red-500";
    default:
      return "bg-gray-300";
  }
}

// Fungsi helper untuk mendapatkan warna lingkaran
function getCircleColor(status: TrackingStep["status"]) {
  switch (status) {
    case "completed":
      return "bg-green-600";
    case "in-progress":
      return "bg-yellow-600 animate-pulse";
    case "failed":
      return "bg-red-600";
    default:
      return "bg-gray-300";
  }
}

// Fungsi helper untuk mendapatkan ikon
function getStatusIcon(status: TrackingStep["status"]) {
  switch (status) {
    case "completed":
      return <IoCheckmarkDoneOutline className="w-4 h-4 text-white" />;
    case "in-progress":
      return <IoIosTimer className="w-4 h-4 text-white" />;
    case "failed":
      return <IoCloseCircleOutline className="w-4 h-4 text-white" />;
    default:
      return null;
  }
}

export default function TrackingOrder({ steps }: TrackingOrderProps) {

  const preparedSteps = steps.map((item, idx) => {
    const isLast = idx === steps.length - 1;
    return {
      ...item,
      isLast,
      lineColor: getLineColor(item.status),
      circleColor: getCircleColor(item.status),
      icon: getStatusIcon(item.status),
      textColor: item.status === "failed" ? "text-red-600" : "text-gray-900",
    };
  });

  return (
    <div className="w-full max-w-md mx-auto bg-white rounded-xl border border-gray-200 shadow-md p-4">
      <h2 className="text-xl font-bold mb-4 text-gray-800">Tracking Order</h2>
      <ol className="relative">
        {preparedSteps.map((item, idx) => (
          <li key={idx} className="ml-4 relative">

            {/* Garis Vertikal */}
            {!item.isLast && (
              <span
                className={`absolute top-6 left-[-1px] w-[2px] h-full ${item.lineColor}`}
              />
            )}

            {/* Icon Status */}
            <span
              className={`absolute -left-3 flex items-center justify-center w-6 h-6 rounded-full ring-4 ring-white ${item.circleColor}`}
            >
              {item.icon}
            </span>

            {/* Konten */}
            <div className="mb-6 ml-5">
              <h3 className={`font-semibold ${item.textColor}`}>{item.step}</h3>
              <p className="text-gray-600 text-sm">{item.description}</p>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}
