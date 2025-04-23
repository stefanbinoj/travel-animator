import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import useMapStore from "@/store/useMapStore";

export default function TabsComponent() {
  const unit = useMapStore((state) => state.unit);
  const setUnit = useMapStore((state) => state.setUnit);
  return (
    <Tabs value={unit} defaultValue="km" className="items-center">
      <TabsList>
        <TabsTrigger
          onClick={() => {
            setUnit("km");
          }}
          value="km"
        >
          Km
        </TabsTrigger>
        <TabsTrigger
          onClick={() => {
            setUnit("mil");
          }}
          value="mil"
        >
          Mil
        </TabsTrigger>
        <TabsTrigger
          onClick={() => {
            setUnit("off");
          }}
          value="off"
        >
          Off
        </TabsTrigger>
      </TabsList>
    </Tabs>
  );
}
