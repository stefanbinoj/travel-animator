"use client";

import { useEffect, useState } from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
} from "@/components/ui/sidebar";
import useMapStore, { waypointsType } from "@/store/useMapStore";
import Image from "next/image";
import { it } from "node:test";

export function AppSidebar() {
  const selected = useMapStore((state) => state.selected);
  const changeSelected = useMapStore((state) => state.changeSelected);
  const waypoints = useMapStore((state) => state.waypoints);
  const setWaypoints = useMapStore((state) => state.setWayPoints);

  const [waypointsLocation, setWaypointsLocation] = useState<string[]>([]);

  async function getPlaceName(lat: number, lon: number) {
    const res = await fetch(
      `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json`
    );
    const data = await res.json();
    return data.display_name || "Unknown location";
  }

  useEffect(() => {
    if (waypoints.length === 0) return;

    console.log("firing req");
    const fetchAllPlaceNames = async () => {
      const locationNames = await Promise.all(
        waypoints.map((each) => getPlaceName(each.latitude, each.longitude))
      );
      console.log(locationNames);
      setWaypointsLocation(locationNames);
    };

    fetchAllPlaceNames();
  }, [waypoints]);

  const deleteWayPoint = (item: waypointsType) => {
    console.log(item);
    const newWaypointsArr = waypoints.filter(
      (wp) =>
        !(wp.latitude === item.latitude && wp.longitude === item.longitude)
    );
    console.log("deleted : ", newWaypointsArr);
    setWaypoints(newWaypointsArr);
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
        {selected == "route" ? (
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
                          src="/plane.png"
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
                        src="/plane.png"
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
                        src="/finished.png"
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
        ) : (
          <p>hi</p>
        )}

        {/* <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup> */}
      </SidebarContent>
    </Sidebar>
  );
}
