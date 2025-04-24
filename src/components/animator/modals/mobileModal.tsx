import Image from "next/image";
import React from "react";

const MobileScreen = () => {
  return (
    <div className="h-dvh w-dvw">
      <Image src="/mobile.svg" alt="mobile screen" width={1000} height={2000} />
    </div>
  );
};

export default MobileScreen;
