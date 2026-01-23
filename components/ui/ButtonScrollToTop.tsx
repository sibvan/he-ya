"use client";

import UpIcon from "../icons/UpIcon";
import { useEffect, useState } from "react";
import clsx from "clsx";

const ButtonScrollToTop = () => {
  const [clsss, setClass] = useState("");

  useEffect(() => {
    const onScroll = () => {
      if (window.pageYOffset > 1000) {
        setClass("opacity-100 pointer-events-auto translate-y-0");
      } else {
        setClass("opacity-0 pointer-events-none translate-y-full");
      }
    };
    onScroll();
    window.addEventListener("scroll", onScroll);

    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <button
      onClick={scrollToTop}
      className={clsx(
        clsss,
        "sticky bottom-0 ml-auto cursor-pointer transition duration-300 ease-in-out",
      )}
    >
      <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-black text-white">
        <UpIcon className="h-6 w-6" />
      </div>
    </button>
  );
};

export default ButtonScrollToTop;
