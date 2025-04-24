import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import React, { useState } from "react";
import Image from "next/image"; // Import Image component
import useNavStore from "@/store/useNavStore";

// Define a type for the vehicle
type Vehicle = {
  name: string;
  src: string;
  width: number;
  height: number;
};

// Sample vehicle data (using images from public folder)
const vehicles: Vehicle[] = [
  { name: "Car", src: "/car.svg", width: 32, height: 32 },
  { name: "Car", src: "/car.svg", width: 32, height: 32 },
  { name: "Car", src: "/car.svg", width: 32, height: 32 },
];

const ChooseVehicle = () => {
  const setModal = useNavStore((state) => state.setModal);
  return (
    <Sidebar side="right">
      <SidebarContent className="p-1">
        <SidebarGroup className="mt-18 mb-3">
          <SidebarGroupLabel className="text-lg font-semibold mb-2">
            Models
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="flex justify-center items-center  py-3">
              <Image
                src={vehicles[0].src}
                alt={vehicles[0].name}
                width={170}
                height={280}
              />
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              <Image
                src="/options.svg"
                alt="options"
                width={300}
                height={546}
                onClick={() => setModal("pro")}
              />
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
};

export default ChooseVehicle;
