"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
} from "@/components/ui/sidebar";
import useMapStore from "@/store/useMapStore";

export function AppSidebar() {
  const selected = useMapStore((state) => state.selected);
  const changeSelected = useMapStore((state) => state.changeSelected);
  const waypoints = useMapStore((state) => state.waypoints);
  console.log("hh", waypoints);

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
            <SidebarGroupContent>
              <SidebarMenu>
                {waypoints.map((item, idx) => (
                  <SidebarMenuItem key={idx}>
                    <SidebarMenuButton asChild>
                      <a>
                        <span>{item.latitude}</span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
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
