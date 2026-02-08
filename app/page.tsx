"use client";

import { useState } from "react";
import { authClient, signIn } from "@/lib/auth-client";
import { addPlaylistToDb } from "@/lib/actions";
import { usePlaylistsStore } from "@/stores/playlistsStore";

import Image from "next/image";
import { useRouter } from "next/navigation";

export default function Home() {
  const addPlaylist = usePlaylistsStore((state) => state.addPlaylist);
  const playlists = usePlaylistsStore((state) => state.playlists);

  const [link, setLink] = useState("");
  const router = useRouter();

  const { data: session } = authClient.useSession();

  const onFormSubmit = async (event: React.SyntheticEvent) => {
    event.preventDefault();
    const playlistId = getPlaylistId(link);
    if (!playlistId) return;
    if (!session) signIn();

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
    const playlist = {
      ...(await fetchPlaylist(playlistId)),
      userId: session?.user.id,
    };

    const wasPlaylistAddedToDb = await addPlaylistToDb(playlist);

    if (wasPlaylistAddedToDb) {
      addPlaylist(playlist);
      return true;
    }
  };

  const getPlaylistId = (str: string) => {
    try {
      return new URL(str).searchParams.get("list");
    } catch {}
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

      <div className="flex justify-center">
        <form
          className="relative flex w-full justify-center md:w-[80%] xl:w-[50%]"
          onSubmit={onFormSubmit}
        >
          <input
            className="text-16 h-16 w-full rounded-full bg-white p-6"
            value={link}
            placeholder="Вставьте ссылку на плейлист сюда"
            onChange={(e) => setLink(e.target.value)}
            type="text"
          />

          <button
            className="bg-red absolute top-2 right-2 flex h-12 w-12 cursor-pointer items-center justify-center rounded-full"
            type="submit"
          >
            <Image
              className="h-6 w-6 filter-[brightness(0)_invert(1)]"
              width={24}
              height={24}
              src="/icons/arrow-small-right.svg"
              alt="icon-arrow-small-right"
            ></Image>
          </button>
        </form>
      </div>
    </>
  );
}
