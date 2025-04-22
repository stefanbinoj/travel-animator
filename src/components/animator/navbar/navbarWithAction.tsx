import { Trash } from "lucide-react";
import Image from "next/image";

import React from "react";
import { Button } from "../../ui/button";
import ToggleThemeComponent from "./themeToggle";

const NavbarWithActions = () => {
  return (
    <div className="flex justify-around gap-2">
      <Image
        src="/branch.svg"
        alt="branch"
        width={40}
        height={40}
        className="rounded-full"
      />
      <div className="w-[40] h-[40] p-3 bg-[#2A2A2A] items-center flex justify-center rounded-full">
        <Trash color="red" className="self-center" />
      </div>
      <Button
        variant="secondary"
        className="bg-[#0A84FF] h-[40] rounded-2xl py-2 px-6 text-sm"
      >
        Export Video
      </Button>
      <Button
        variant="outline"
        className=" h-[40] rounded-2xl py-2 px-6 text-sm border-1 "
      >
        Sign in
      </Button>
      <ToggleThemeComponent />
    </div>
  );
};

export default NavbarWithActions;
