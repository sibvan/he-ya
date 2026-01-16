"use client";

import { usePlaylistsStore } from "@/stores/usePlaylistsStore";
import Link from "next/link";
import Status from "@/components/ui/Status";
import { usePlaylist } from "@/hooks/usePlaylist";
import Placeholder from "@/components/blocks/Placeholder";
import PlaylistsPlaceholderIcon from "@/components/icons/PlaylistsPlaceholderIcon";

const PlaylistsPage = () => {
  const { getPercent } = usePlaylist();
  const playlists = usePlaylistsStore((state) => state.playlists);

  return (
    <>
      <h1 className="title-h1">Мои плейлисты</h1>
      {playlists.length > 0 ? (
        <div className="cards-grid">
          {playlists
            .toSorted((a, b) => b.date - a.date)
            .map((playlist) => {
              const percent = getPercent(playlist.videos);

              return (
                <Link
                  href={`/playlists/${playlist.id}`}
                  className="card grid grid-cols-[1fr_auto] gap-4 py-6"
                  key={playlist.id}
                >
                  <p className="title-24-120 col-span-2 font-black md:-order-3 md:col-span-1">
                    {playlist.title}
                  </p>
                  <p className="text-16 self-center md:-order-1">
                    {playlist.videos.length} видео
                  </p>

                  <Status
                    classList="md:-order-2"
                    color={percent === 100 ? "green" : "blue"}
                  >
                    {percent === 100 ? "Закончил" : `${percent} %`}
                  </Status>
                </Link>
              );
            })}
        </div>
      ) : (
        <Placeholder
          title="У вас нет сохранённых плейлистов"
          subtitle="Добавьте первый с помощью кнопки в шапке"
          Icon={PlaylistsPlaceholderIcon}
        />
      )}
    </>
  );
};

export default PlaylistsPage;
