"use client";

import { useId } from "react";
import useMapStore from "@/store/useMapStore";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

export default function DimensionToggle() {
  const id = useId();
  const is3D = useMapStore((state) => state.is3D);
  const toggleDimension = useMapStore((state) => state.toggleDimension);

  return (
    <div className="flex items-center gap-2">
      <div className="relative inline-grid h-9 grid-cols-[1fr_1fr] w-[90px] items-center text-sm font-medium">
        <Switch
          id={id}
          checked={is3D}
          onCheckedChange={toggleDimension}
          className="peer data-[state=unchecked]:bg-input/50 data-[state=checked]:bg-input/50 absolute inset-0 h-[inherit] w-auto rounded-full [&_span]:z-10 [&_span]:h-full [&_span]:w-1/2 [&_span]:rounded-full [&_span]:transition-transform [&_span]:duration-300 [&_span]:ease-[cubic-bezier(0.16,1,0.3,1)] [&_span]:data-[state=checked]:translate-x-full [&_span]:data-[state=checked]:rtl:-translate-x-full"
        />
        <span className="pointer-events-none relative ms-0.5 flex items-center justify-center px-2 text-center transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] peer-data-[state=checked]:invisible peer-data-[state=unchecked]:translate-x-full peer-data-[state=unchecked]:rtl:-translate-x-full">
          <span className="text-[10px] font-medium uppercase text-foreground">
            2D
          </span>
        </span>
        <span className="pointer-events-none relative me-0.5 flex items-center justify-center px-2 text-center transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] peer-data-[state=checked]:-translate-x-full peer-data-[state=unchecked]:invisible peer-data-[state=checked]:rtl:translate-x-full">
          <span className="text-[10px] font-medium uppercase text-foreground">
            3D
          </span>
        </span>
      </div>
    </div>
  );
}
