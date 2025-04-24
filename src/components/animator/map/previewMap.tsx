import { AspectRatio } from "@/components/ui/aspect-ratio";
import useMapStore from "@/store/useMapStore";
import MapNoSSR from "./mapNoSSR";
import RatioSelector from "./ratioSelector";

export default function PreviewMap() {
  const ratio = useMapStore((state) => state.ratio);

  // Determine max width based on aspect ratio
  const getMaxWidth = () => {
    if (ratio.width === ratio.height) {
      return "max-w-[600px]"; // 1:1 ratio gets max width of 600px
    } else if (ratio.height > ratio.width) {
      return "max-w-[400px]"; // portrait ratios
    } else {
      return "max-w-[900px]"; // landscape ratios
    }
  };

  return (
    <div className="relative flex-1 bg-[#121216] w-full h-full">
      <RatioSelector />
      <div className={`mx-auto my-auto ${getMaxWidth()}`}>
        <AspectRatio ratio={ratio.width / ratio.height} className="rounded-2xl">
          <MapNoSSR />
        </AspectRatio>
      </div>
    </div>
  );
}
