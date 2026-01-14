"use client";

import clsx from "clsx";
import Image from "next/image";
import Button from "@/components/ui/Button";
import { ChangeEvent, FormEvent } from "react";
import { usePlaylist } from "@/hooks/usePlaylist";
import { useRouter } from "next/navigation";

export default function Home() {
  const { getVideos, url, setUrl, setError, isLoading, error } = usePlaylist();
  const router = useRouter();
  const inputOnChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setError(null);
    setUrl(e.target.value);
  };

  const formOnSubmitHandler = async (event: FormEvent) => {
    event.preventDefault();
    const id = await getVideos();
    if (id) {
      router.push(`/playlists/${id}`);
    }
  };

  return (
    <>
      <div>
        <h1 className="flex flex-col gap-2 text-center">
          <span className="text-24 tracking-widest uppercase">
            Учитесь эффективно по плейлистам
          </span>
          <span className="title-h1 tracking-widest">YOUTUBE</span>
        </h1>
      </div>
      <div className="flex justify-center">
        <Image
          className="h-6 w-6"
          alt="angle-down"
          width={24}
          height={24}
          src="icons/angle-down.svg"
        ></Image>
      </div>

      <div className="flex w-full flex-col items-center gap-4">
        <div
          className={clsx(
            isLoading ? "w-16" : "w-full md:w-[80%] xl:w-[50%]",
            "transition-width relative h-16 rounded-full bg-white duration-300 ease-in-out",
          )}
        >
          <form
            action=""
            onSubmit={(e) => formOnSubmitHandler(e)}
            className="h-full w-full"
          >
            <input
              value={url}
              onChange={(e) => inputOnChangeHandler(e)}
              placeholder="Вставьте ссылку на плейлист сюда"
              type="text"
              className={clsx(
                "text-16 mb-4 h-full w-full rounded-full pl-6 outline-1 outline-black/20 placeholder:text-black/50 hover:outline-black/50 focus:outline-black/80",
                isLoading && "hidden",
              )}
            />

            <Button className="absolute top-2 right-2 cursor-pointer">
              <Image
                className={clsx("h-6 w-6", isLoading && "animate-spin")}
                alt="arrow-small-right"
                width={24}
                height={24}
                src={
                  isLoading
                    ? "icons/spinner-alt.svg"
                    : "icons/arrow-small-right.svg"
                }
              ></Image>
            </Button>
          </form>
        </div>
        {error && <p className="text-16 text-red text-center">{error}</p>}
      </div>
    </>
  );
}
