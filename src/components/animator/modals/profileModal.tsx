import React from "react";

import Image from "next/image";
import { Check, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import useNavStore from "@/store/useNavStore";
const profileModal = () => {
  const setModal = useNavStore((state) => state.setModal);
  const modal = useNavStore((state) => state.modal);
  return (
    <Dialog defaultOpen={modal === "pro"}>
      <DialogContent className="gap-0 bg-[#0A84FF] border border-[#292929] rounded-[26px] min-w-[535px] h-full max-h-[666px] flex flex-col items-center p-0 overflow-hidden sm:max-w-lg data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95">
        <DialogHeader className="hidden">
          <DialogTitle className="text-lg leading-none font-semibold sr-only">
            pro dialog
          </DialogTitle>
        </DialogHeader>

        <div className="relative w-full fkex-col  min-h-[301px]">
          <Image
            alt="top"
            loading="lazy"
            width={228}
            height={109}
            className="absolute left-30 w-[290px] self-center align-middle ml-auto h-[108.32px] top-4"
            src="/pro-top.png"
            style={{ color: "transparent" }}
          />
          <Image
            alt="bottom"
            loading="lazy"
            width={535}
            height={301}
            decoding="async"
            className="absolute bottom-0"
            src="/pro-bottom.png"
            style={{ color: "transparent" }}
          />
        </div>

        <div className="absolute bottom-0 left-0 flex flex-col gap-[46px] w-full h-[417px] bg-[#121216] pt-[46px] pb-5 px-5 rounded-t-[26px]">
          <div className="flex flex-col gap-[32px]">
            <h3 className="text-[22px] font-medium leading-tight">
              Create Amazing Map Videos
            </h3>
            <div className="flex gap-[19px]">
              <div className="flex flex-col gap-[12px]">
                <span className="flex gap-2.5 text-[12px] font-light leading-[17px] items-center">
                  <Image
                    alt="check"
                    loading="lazy"
                    width={16}
                    height={12}
                    decoding="async"
                    src="/check.png"
                    style={{ color: "transparent" }}
                  />
                  Premium Animated 3D Models
                </span>
                <span className="flex gap-2.5 text-[12px] font-light leading-[17px] items-center">
                  <Image
                    alt="check"
                    loading="lazy"
                    width={16}
                    height={12}
                    decoding="async"
                    src="/check.png"
                    style={{ color: "transparent" }}
                  />
                  Multiple Map Styles
                </span>
              </div>
              <div className="flex flex-col gap-[12px]">
                <span className="flex gap-2.5 text-[12px] font-light leading-[17px] items-center">
                  <Image
                    alt="check"
                    loading="lazy"
                    width={16}
                    height={12}
                    decoding="async"
                    src="/check.png"
                    style={{ color: "transparent" }}
                  />
                  No Ads + No Watermark
                </span>
                <span className="flex gap-2.5 text-[12px] font-light leading-[17px] items-center">
                  <Image
                    alt="check"
                    loading="lazy"
                    width={16}
                    height={12}
                    decoding="async"
                    src="/check.png"
                    style={{ color: "transparent" }}
                  />
                  Unlimited Video
                </span>
              </div>
            </div>
          </div>

          <div className="flex gap-3">
            <div className="h-[214px] w-[157px] items-center text-center flex flex-col pt-[41px] pb-2 rounded-[17px] justify-between bg-[#19191D]">
              <div className="flex flex-col gap-4">
                <span className="text-[12px] leading-none font-medium">
                  1 Yearly
                </span>
                <h3 className="text-[22px] leading-[38px] font-medium">
                  $99.00
                </h3>
                <span className="text-[12px] leading-[22px] font-medium">
                  $99.00/week
                </span>
              </div>
              <Button
                size="sm"
                className="max-w-[141px] w-full cursor-pointer !bg-[#19191D] border border-white/60 text-white hover:!bg-[#2a2a2e]"
              >
                Get Started
              </Button>
            </div>
            <div className="h-[214px] w-[157px] items-center text-center flex flex-col pt-[41px] pb-2 rounded-[17px] justify-between bg-[#19191D]">
              <div className="flex flex-col gap-4">
                <span className="text-[12px] leading-none font-medium">
                  1 Weekly
                </span>
                <h3 className="text-[22px] leading-[38px] font-medium">
                  $199.00
                </h3>
                <span className="text-[12px] leading-[22px] font-medium">
                  $46.44/week
                </span>
              </div>
              <Button
                size="sm"
                className="max-w-[141px] w-full cursor-pointer !bg-[#19191D] border border-white/60 text-white hover:!bg-[#2a2a2e]"
              >
                Get Started
              </Button>
            </div>
            <div className="h-[214px] w-[157px] items-center text-center flex flex-col pt-[41px] pb-2 rounded-[17px] justify-between border border-[#0A84FF] bg-[#111B2A]">
              <div className="flex flex-col gap-4">
                <span className="text-[12px] leading-none font-medium">
                  1 Monthly
                </span>
                <h3 className="text-[22px] leading-[38px] font-medium">
                  $699.00
                </h3>
                <span className="text-[12px] leading-[22px] font-medium">
                  $13.41/week
                </span>
              </div>
              <Button
                size="sm"
                className="max-w-[141px] w-full cursor-pointer !bg-white text-black hover:text-black hover:!bg-white/90"
              >
                Get Started
              </Button>
            </div>
          </div>
        </div>

        <DialogClose asChild>
          <Button
            type="button"
            variant="ghost"
            onClick={() => setModal(null)}
            size="icon"
            className="absolute top-4 left-4 rounded-xs opacity-70 transition-opacity hover:opacity-100 focus:outline-none disabled:pointer-events-none w-6 h-6 ring-offset-background focus:ring-2 focus:ring-ring focus:ring-offset-2 text-white hover:bg-white/10"
          >
            <X className="h-4 w-4" />
            <span className="sr-only">Close</span>
          </Button>
        </DialogClose>
      </DialogContent>
    </Dialog>
  );
};

export default profileModal;
