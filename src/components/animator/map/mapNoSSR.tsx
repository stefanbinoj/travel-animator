"use client";

import dynamic from "next/dynamic";
import { Suspense } from "react";

const Map = dynamic(() => import("@/components/animator/map/map"), {
  ssr: false,
});

const Loading = () => (
  <div className="h-full bg-red-200 flex items-center justify-center text-gray-500">
    Loading map...
  </div>
);

export default function MapNoSSR() {
  return (
    <Suspense fallback={<Loading />}>
      <Map />
    </Suspense>
  );
}
