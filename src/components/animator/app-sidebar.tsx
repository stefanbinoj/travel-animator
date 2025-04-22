import { Calendar, Home, Inbox, Search, Settings } from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenuButton,
  SidebarSeparator,
} from "@/components/ui/sidebar";

export function AppSidebar() {
  const selected = false;
  return (
    <Sidebar collapsible="none">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent className="flex justify-center ">
            <SidebarMenuButton
              size="default"
              className={`${
                selected ? "bg-[#0A84FF]" : "border-2"
              } rounded-2xl px-5  `}
            >
              Routes
            </SidebarMenuButton>
            <SidebarMenuButton
              className={`${
                !selected ? "bg-[#0A84FF]" : "border-2"
              } rounded-2xl  px-5 `}
            >
              Preview
            </SidebarMenuButton>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarSeparator />
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
