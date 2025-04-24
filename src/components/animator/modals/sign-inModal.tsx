import Image from "next/image";
import { X } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import useNavStore from "@/store/useNavStore";

export default function AuthDialog() {
  const setModal = useNavStore((state) => state.setModal);
  const modal = useNavStore((state) => state.modal);
  return (
    <Dialog defaultOpen={modal === "sign-in"}>
      <DialogContent className="gap-0 bg-[#0A84FF] border border-white/[.15] rounded-[26px] min-w-[713px] min-h-[398px] flex items-center p-0 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95">
        <DialogHeader className="hidden">
          <DialogTitle className="sr-only">Sign in</DialogTitle>
        </DialogHeader>

        {/* Left Panel (Graphics) */}
        <div className="relative flex flex-col items-center w-[337px] min-h-[398px] self-stretch">
          <Image
            alt="top"
            loading="lazy"
            width={268}
            height={109}
            decoding="async"
            className="absolute top-20"
            src="/pro-top.png"
            style={{ color: "transparent" }}
          />
          <Image
            alt="bottom"
            loading="lazy"
            width={337}
            height={198}
            decoding="async"
            className="absolute bottom-0 rounded-bl-[26px]"
            src="/pro-bottom.png"
            style={{ color: "transparent" }}
          />
        </div>

        {/* Right Panel (Login Form) */}
        <div className="flex flex-col items-start px-[54px] w-[376px] bg-[#0F1A20] min-h-[398px] rounded-r-[26px] gap-[26px] justify-center self-stretch">
          <h2 className="font-bold text-[22px] text-white">Log In / Sign Up</h2>
          <div className="flex flex-col gap-6 w-full">
            <div className="flex flex-col gap-[14px]">
              <Button
                variant="secondary"
                className="flex items-center cursor-pointer justify-center gap-5 bg-[#F3F6F9] hover:bg-gray-200 py-2.5 px-[33px] rounded-[33px] font-medium text-[#03080B] w-full h-auto"
              >
                <Image
                  alt="apple"
                  loading="lazy"
                  width={21}
                  height={20}
                  decoding="async"
                  src="/apple.svg"
                  style={{ color: "transparent" }}
                />
                <span className="text-[12px]">Continue with Apple</span>
              </Button>
              <Button
                variant="secondary"
                className="flex items-center cursor-pointer justify-center gap-5 bg-[#F3F6F9] hover:bg-gray-200 py-2.5 px-[33px] rounded-[33px] font-medium text-[#03080B] w-full h-auto"
              >
                <Image
                  alt="google"
                  loading="lazy"
                  width={20}
                  height={20}
                  decoding="async"
                  src="/google.svg"
                  style={{ color: "transparent" }}
                />
                <span className="text-[12px]">Continue with Google</span>
              </Button>
            </div>
            <span className="text-[12px] text-white/[.33] font-light">
              By continuing, you accept our Terms of Service and acknowledge
              receipt of our Privacy & Cookie Policy
            </span>
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
}
