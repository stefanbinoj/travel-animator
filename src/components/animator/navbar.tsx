"use client";
import Image from "next/image";
import React from "react";
import NavbarWithActions from "./navbar/navbarWithAction";
import useNavStore, { ModalType } from "@/store/useNavStore";

const Navbar = () => {
  const setModal = useNavStore((state) => state.setModal);

  return (
    <nav className="w-dvw  text-white py-3 px-2 z-100 backdrop-blur-md border-b border-white/20">
      <div className="flex  justify-between">
        <div className="flex gap-4">
          <div className="flex gap-2 text-centert">
            <Image src="/logo.svg" alt="logo" width={43} height={43} />
            <p className=" font-bold text-2xl  self-center">Travel Animator</p>
          </div>
          <div
            className="bg-[#2A2A2A] rounded-4xl flex gap-2 h-[38px] w-[91px] justify-center cursor-pointer"
            onClick={() => setModal("pro")}
          >
            <Image src="/premium.svg" alt="pro" width={22} height={22} />
            <p className=" text-sm self-center">Pro</p>
          </div>
        </div>
        <NavbarWithActions />
      </div>
    </nav>
  );
};

export default Navbar;
