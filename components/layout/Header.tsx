"use client";

import Link from "next/link";
import Image from "next/image";
import Logo from "../ui/Logo";
import Burger from "../ui/Burger";
import Status from "../ui/Status";

import { usePlaylistsStore } from "@/stores/usePlaylistsStore";
import clsx from "clsx";

import { useState, useEffect } from "react";

const Header = () => {
  const playlistsNum = usePlaylistsStore((state) => state.getPlaylistNum());

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const burgerOnClickHandler = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenuOnResize = () => {
    if (window.innerWidth >= 768) setIsMenuOpen(false);
  };

  useEffect(() => {
    if (isMenuOpen) {
      document.body.classList.add("overflow-hidden");
    }

    if (!isMenuOpen) {
      document.body.classList.remove("overflow-hidden");
    }
  }, [isMenuOpen]);

  useEffect(() => {
    window.addEventListener("resize", closeMenuOnResize);

    return () => {
      window.removeEventListener("resize", closeMenuOnResize);
    };
  }, []);

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <>
      <Burger
        onClick={burgerOnClickHandler}
        className={clsx(
          "fixed top-6 right-3 z-10 cursor-pointer md:hidden",
          isMenuOpen && "open",
        )}
      />
      <header
        className={clsx(
          "z-1 flex w-dvw flex-col justify-between transition duration-300 ease-in-out md:static md:h-auto md:w-auto md:flex-row md:bg-transparent md:p-0",
          isMenuOpen && "fixed top-0 left-0 h-dvh bg-white px-3 py-6",
        )}
      >
        <div className="flex justify-between">
          <Link className="text-[24px]/[100%]" onClick={closeMenu} href="/">
            <Logo />
          </Link>
        </div>

        <nav
          className={clsx(
            "mt-[calc(200px/3)] flex flex-col gap-6 md:mt-0 md:flex md:flex-row",
            !isMenuOpen && "hidden",
          )}
        >
          <div className="text-16 flex items-center gap-2">
            <Link onClick={closeMenu} href="/playlists">
              Мои плейлисты
            </Link>
            <Status color="grey">{playlistsNum}</Status>
          </div>
          <div className="text-16 flex items-center gap-2">
            <Link onClick={closeMenu} href="/">
              Добавить новый
            </Link>
            <Image
              className="h-6 w-6"
              alt="+"
              width={24}
              height={24}
              src="/icons/add.svg"
            ></Image>
          </div>
        </nav>

        <div className={clsx("mt-auto md:block", !isMenuOpen && "hidden")}>
          <div className="mb-4 h-px w-full bg-black md:hidden"></div>

          <div className="flex items-center gap-2">
            {/* <Link
              onClick={closeMenu}
              href=""
              className="text-16 block"
            >
              Войти
            </Link> */}
            <p className="text-16 block">Войти</p>
            <Status color="grey">Скоро</Status>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
