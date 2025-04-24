"use client";

import { useEffect, useState } from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
} from "@/components/ui/sidebar";
import useMapStore, { MapStoreType, waypointsType } from "@/store/useMapStore";
import Image from "next/image";
import { Slider } from "../ui/slider";
import { Flag, Map, MapPinned, ChevronRight, ChevronLeft } from "lucide-react";
import { Switch } from "../ui/switch";
import TabsComponent from "../comp-426";
import { mapArray } from "@/lib/constants";

export function AppSidebar() {
  const selected = useMapStore((state) => state.selected);
  const changeSelected = useMapStore((state) => state.changeSelected);

  const waypoints = useMapStore((state) => state.waypoints);
  const setWayPoints = useMapStore((state) => state.setWayPoints);

  const modelSize = useMapStore((state) => state.modelSize);
  const setModalSize = useMapStore((state) => state.setModalSize);

  const duration = useMapStore((state) => state.duration);
  const setDuration = useMapStore((state) => state.setDuration);

  const flag = useMapStore((state) => state.flag);
  const setFlag = useMapStore((state) => state.setFlag);

  const mapStyle = useMapStore((state) => state.mapStyle);
  const setMapStyle = useMapStore((state) => state.setMapStyle);

  const [showMapStyle, setShowMapStyle] = useState<boolean>(false);
  const [waypointsLocation, setWaypointsLocation] = useState<string[]>([]);

  async function getPlaceName(lat: number, lon: number) {
    const res = await fetch(
      `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json`
    );
    const data = await res.json();
    return data.display_name || "Unknown location";
  }

  // useEffect(() => {
  //   if (waypoints.length === 0) return;

  //   console.log("firing req");
  //   const fetchAllPlaceNames = async () => {
  //     const locationNames = await Promise.all(
  //       waypoints.map((each) => getPlaceName(each.latitude, each.longitude))
  //     );
  //     console.log(locationNames);
  //     setWaypointsLocation(locationNames);
  //   };

  //   fetchAllPlaceNames();
  // }, [waypoints]);

  const deleteWayPoint = (item: waypointsType) => {
    console.log(item);
    const newWaypointsArr = waypoints.filter(
      (wp) =>
        !(wp.latitude === item.latitude && wp.longitude === item.longitude)
    );
    console.log("deleted : ", newWaypointsArr);
    setWayPoints(newWaypointsArr);
  };

  return (
    <Sidebar collapsible="none">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent className="flex justify-center self-center  mt-10 border-1 p-1 w-fit rounded-full ">
            <SidebarMenuButton
              onClick={() => changeSelected()}
              className={`${
                selected == "route" ? "bg-[#0A84FF]" : "border-0"
              } rounded-2xl px-5 text-lg`}
            >
              Routes
            </SidebarMenuButton>
            <SidebarMenuButton
              onClick={() => changeSelected()}
              className={`${
                selected === "preview" ? "bg-[#0A84FF]" : "border-0"
              } rounded-2xl py-2 px-5 text-lg`}
            >
              Preview
            </SidebarMenuButton>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarSeparator />
        {selected == "route" && (
          <SidebarGroup>
            <SidebarGroupLabel className="mb-3">
              {waypoints.length} Way points
            </SidebarGroupLabel>
            {waypoints.length > 0 ? (
              <SidebarGroupContent>
                <SidebarMenu className="flex-col gap-3">
                  {waypoints.map((item, idx) => (
                    <SidebarMenuItem key={idx} className="flex gap-2 mx-2 ">
                      <p className="self-center text-xl">=</p>
                      <div className="flex justify-start bg-[#202024] py-2 px-2 rounded-full gap-3 flex-1">
                        <Image
                          width={22}
                          height={8}
                          src="/plane.svg"
                          alt="plane"
                        />
                        <input
                          disabled
                          value={
                            waypointsLocation[idx]
                              ? waypointsLocation[idx]
                              : "Loading location..."
                          }
                          type="text"
                          placeholder="Starting point"
                          className="text-md text-gray-500 truncate"
                        />
                      </div>
                      <p
                        className="self-center text-xl cursor-pointer font-serif"
                        onClick={() => deleteWayPoint(item)}
                      >
                        x
                      </p>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            ) : (
              <SidebarGroupContent>
                <SidebarMenu className="gap-5">
                  <SidebarMenuItem className="flex gap-2 mx-2 ">
                    <p className="self-center text-xl">=</p>
                    <div className="flex justify-start bg-[#202024] py-2 px-2 rounded-full gap-3 flex-1">
                      <Image
                        width={22}
                        height={8}
                        src="/plane.svg"
                        alt="plane"
                      />
                      <input
                        disabled
                        type="text"
                        placeholder="Starting point"
                        className="text-md text-gray-500"
                      />
                    </div>
                  </SidebarMenuItem>
                  <SidebarMenuItem className="flex gap-2 mx-2">
                    <p className="self-center text-xl">=</p>
                    <div className="flex justify-start bg-[#202024] py-2 px-2 rounded-full gap-3 flex-1">
                      <Image
                        width={22}
                        height={8}
                        src="/flag.svg"
                        alt="plane"
                      />
                      <input
                        disabled
                        type="text"
                        placeholder="Starting point"
                        className="text-md text-gray-500"
                      />
                    </div>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            )}
          </SidebarGroup>
        )}
        {selected == "preview" && !showMapStyle && (
          <>
            <SidebarGroup>
              <div className="flex justify-between mb-3 ">
                <SidebarGroupLabel className="text-white">
                  Modal Size
                </SidebarGroupLabel>
                <SidebarGroupLabel className="text-white">
                  {modelSize / 100}
                </SidebarGroupLabel>
              </div>
              <SidebarGroupContent>
                <SidebarMenu>
                  <SidebarMenuItem className="flex gap-2 mx-2 ">
                    <Slider
                      value={[modelSize]}
                      onValueChange={(e) => setModalSize(e[0])}
                      className="text-blue-500"
                    />
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
            <SidebarGroup>
              <div className="flex justify-between mb-3 ">
                <SidebarGroupLabel className="text-white">
                  Duration
                </SidebarGroupLabel>
                <SidebarGroupLabel className="text-white">
                  {duration} sec
                </SidebarGroupLabel>
              </div>
              <SidebarGroupContent>
                <SidebarMenu>
                  <SidebarMenuItem className="flex gap-2 mx-2 ">
                    <Slider
                      value={[duration]}
                      onValueChange={(e) => setDuration(e[0])}
                      className="text-blue-500"
                    />
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
            <SidebarGroup className="flex-row mt-3 mb-3 px-5">
              <div className="flex gap-2">
                <Flag size={22} className="self-center" />

                <SidebarGroupLabel className="text-white">
                  Flag
                </SidebarGroupLabel>
              </div>
              <SidebarGroupContent>
                <SidebarMenu>
                  <SidebarMenuItem className="flex gap-2 mx-2 ml-auto">
                    <Switch checked={flag} onCheckedChange={() => setFlag()} />
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
            <SidebarGroup className="flex-row mb-3 px-5">
              <div className="flex gap-2">
                <Map size={22} className="self-center" />

                <SidebarGroupLabel className="text-white">
                  Unit
                </SidebarGroupLabel>
              </div>
              <SidebarGroupContent>
                <SidebarMenu>
                  <SidebarMenuItem className="flex gap-2 mx-2 ml-auto">
                    <TabsComponent />
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
            <SidebarGroup className="flex-row mb-3 px-5">
              <div className="flex gap-2">
                <SidebarHeader className="text-white self-center">
                  <MapPinned size={22} className="self-center" />
                </SidebarHeader>
                <SidebarGroupLabel className="text-white">
                  Map style
                </SidebarGroupLabel>
              </div>
              <SidebarGroupContent>
                <SidebarMenu>
                  <SidebarMenuItem className="flex gap-2 mx-2 ml-auto">
                    <ChevronRight
                      onClick={() => setShowMapStyle(true)}
                      size={22}
                      className="self-center cursor-pointer"
                    />
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </>
        )}
        {selected == "preview" && showMapStyle && (
          <>
            <SidebarGroup className="flex-row mb-3 px-5">
              <div className="flex gap-2">
                <SidebarHeader className="text-white self-center">
                  <ChevronLeft
                    onClick={() => setShowMapStyle(false)}
                    size={22}
                    className="self-center cursor-pointer"
                  />
                </SidebarHeader>
                <SidebarGroupLabel className="text-white self-center">
                  Map style
                </SidebarGroupLabel>
              </div>
            </SidebarGroup>
            {mapArray.map((img, idx) => (
              <SidebarGroup key={idx} onClick={() => setMapStyle(idx)}>
                <SidebarGroupContent>
                  <SidebarMenu>
                    <SidebarMenuItem>
                      <Image
                        className={`${
                          mapStyle === idx ? "border-2 border-blue-500" : ""
                        } rounded-4xl`}
                        src={`/${img}`}
                        alt="map"
                        width={280}
                        height={65}
                      />
                    </SidebarMenuItem>
                  </SidebarMenu>
                </SidebarGroupContent>
              </SidebarGroup>
            ))}
          </>
        )}
      </SidebarContent>
    </Sidebar>
  );
}
