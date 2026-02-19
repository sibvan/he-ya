"use client";

import { useState, useRef, useEffect } from "react";
import { authClient, signIn } from "@/lib/auth-client";
import { addPlaylistToDb } from "@/lib/actions";
import { usePlaylistsStore } from "@/stores/playlistsStore";

import clsx from "clsx";

import Image from "next/image";
import { useRouter } from "next/navigation";

export default function Home() {
  const addPlaylist = usePlaylistsStore((state) => state.addPlaylist);
  const playlists = usePlaylistsStore((state) => state.playlists);

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [link, setLink] = useState("");

  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);

  const { data: session } = authClient.useSession();

  useEffect(() => {
    inputRef?.current?.focus();
  }, []);

  const onInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLink(event.target.value);
    setError("");
  };

  const onFormSubmit = async (event: React.SyntheticEvent) => {
    event.preventDefault();
    const playlistId = getPlaylistId(link);

    if (!playlistId) {
      setError("Пожалуйста, проверьте ссылку");
      return;
    }

    if (!session) {
      signIn();
      return;
    }

    const isPlaylistInStore = playlists.find(
      (playlist) => playlist.playlistId === playlistId,
    );

    if (isPlaylistInStore) {
      router.push("/playlists/" + playlistId);
      return;
    }

    const wasPlaylistAdded = await addPlaylistToDbAndStore(playlistId);
    if (wasPlaylistAdded) router.push(`/playlists/${playlistId}`);
  };

  const addPlaylistToDbAndStore = async (playlistId: string) => {
    setIsLoading(true);
    try {
      const playlist = {
        ...(await fetchPlaylist(playlistId)),
        userId: session?.user.id,
      };

      const wasPlaylistAddedToDb = await addPlaylistToDb(playlist);

      if (wasPlaylistAddedToDb) {
        addPlaylist(playlist);
        return true;
      }
    } catch {
      setError("Не удалось получить видео");
    } finally {
      setIsLoading(false);
    }
  };

  const getPlaylistId = (str: string) => {
    try {
      return new URL(str).searchParams.get("list");
    } catch {
    } finally {
    }
  };

  const fetchPlaylist = async (playlistId: string) => {
    const response = await fetch(`/api/youtube/playlist/${playlistId}`);
    const result = await response.json();
    return result;
  };

  return (
    <>
      <div className="flex flex-col items-center gap-2">
        <p className="text-24 text-center tracking-widest uppercase">
          Учитесь эффективно по плейлистам
        </p>
        <h1 className="title-h1 tracking-widest uppercase">YOUTUBE</h1>
      </div>

      <div className="flex justify-center">
        <Image
          className="h-6 w-6"
          width={24}
          height={24}
          src="/icons/angle-down.svg"
          alt="icon-angle-down"
        ></Image>
      </div>

      <div className="flex flex-col items-center gap-4">
        <form
          className={clsx(
            "transition-width relative flex justify-center duration-300",
            isLoading ? "w-16" : "w-full md:w-[80%] xl:w-[50%]",
          )}
          onSubmit={onFormSubmit}
        >
          <input
            ref={inputRef}
            className="text-16 h-16 w-full rounded-full bg-white p-6"
            value={link}
            placeholder="Вставьте ссылку на плейлист сюда"
            onChange={onInputChange}
            type="text"
          />

          <button
            className={clsx(
              "bg-red absolute top-2 right-2 flex h-12 w-12 cursor-pointer items-center justify-center rounded-full",
              isLoading && "animate-spin",
            )}
            type="submit"
          >
            <Image
              className="h-6 w-6 filter-[brightness(0)_invert(1)]"
              width={24}
              height={24}
              src={
                isLoading
                  ? "/icons/spinner-alt.svg"
                  : "/icons/arrow-small-right.svg"
              }
              alt="icon-arrow-small-right"
            ></Image>
          </button>
        </form>
        <p className="text-16 text-red">{error}</p>
      </div>
    </>
  );
}
