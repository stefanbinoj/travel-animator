import useMapStore, { RatioType } from "@/store/useMapStore";
import React from "react";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Square, RectangleHorizontal, RectangleVertical } from "lucide-react";
import DimensionToggle from "@/components/ui/dimensionChange";

const commonRatios: Array<{
  label: string;
  ratio: RatioType;
  icon: React.ReactNode;
}> = [
  {
    label: "16:9",
    ratio: { width: 16, height: 9 },
    icon: <RectangleHorizontal className="h-4 w-4 mr-2" />,
  },
  {
    label: "1:1",
    ratio: { width: 1, height: 1 },
    icon: <Square className="h-4 w-4 mr-2" />,
  },
  {
    label: "9:16",
    ratio: { width: 9, height: 16 },
    icon: <RectangleVertical className="h-4 w-4 mr-2" />,
  },
];

export default function RatioSelector() {
  const ratio = useMapStore((state) => state.ratio);
  const changeRatio = useMapStore((state) => state.changeRatio);

  // Find current ratio and icon
  const currentRatioItem =
    commonRatios.find(
      (r) => r.ratio.width === ratio.width && r.ratio.height === ratio.height
    ) || commonRatios[0];

  const handleValueChange = (value: string) => {
    const selectedRatio = commonRatios.find((r) => r.label === value);
    if (selectedRatio) {
      changeRatio(selectedRatio.ratio);
    }
  };

  return (
    <div className="m-5 flex justify-end gap-3">
      <Select value={currentRatioItem.label} onValueChange={handleValueChange}>
        <SelectTrigger className="w-[120px]">
          <SelectValue placeholder="Ratio" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Aspect Ratio</SelectLabel>
            {commonRatios.map((each) => (
              <SelectItem key={each.label} value={each.label}>
                <div className="flex items-center">
                  {each.icon}
                  <span>{each.label}</span>
                </div>
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
      <DimensionToggle />
    </div>
  );
}
