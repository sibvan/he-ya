"use client";

import Link from "next/link";
import { usePlaylistsStore } from "@/stores/playlistsStore";
import StatusBage from "@/components/ui/StatusBage";

const Page = () => {
  const playlists = usePlaylistsStore((state) => state.playlists);

  return (
    <>
      <h1 className="title-h1">Мои плейлисты</h1>
      <div className="cards-gap flex flex-col">
        {playlists
          .sort((a, b) => b.date - a.date)
          .map((playlist) => {
            return (
              <Link
                className="card"
                href={`/playlists/${playlist.playlistId}`}
                key={playlist.playlistId}
              >
                <div className="grid grid-cols-[1fr_auto] gap-4">
                  <h2 className="title-24-120 col-span-2 font-black md:col-span-1">
                    {playlist.title}
                  </h2>
                  <p className="text-16 self-center md:order-1">
                    {playlist.videos.length} видео
                  </p>
                  <div>
                    <StatusBage videos={playlist.videos} />
                  </div>
                </div>
              </Link>
            );
          })}
      </div>
    </>
  );
};

export default Page;
