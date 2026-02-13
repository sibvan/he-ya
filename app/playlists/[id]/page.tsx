"use client";

import { useParams, useRouter } from "next/navigation";
import { usePlaylistsStore } from "@/stores/playlistsStore";
import Link from "next/link";
import Image from "next/image";
import StatusBage from "@/components/ui/StatusBage";
import { deletePlaylistFromDb, updateStatusInDb } from "@/lib/actions";
import { Playlist, TheoryOrPractice, Video } from "@/types/playlists";
import { authClient } from "@/lib/auth-client";
import { useEffect } from "react";

const Page = () => {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();
  const params = useParams<{ id: string }>();
  const playlists = usePlaylistsStore((state) => state.playlists);
  const deletePlaylist = usePlaylistsStore((state) => state.deletePlaylist);
  const changeStatus = usePlaylistsStore((state) => state.changeStatus);
  const playlist = playlists.find(
    (playlist) => playlist.playlistId === params.id,
  );

  useEffect(() => {
    if (!session && !isPending) router.push("/");
  }, [isPending, router, session]);

  const onDeleteClick = async () => {
    const confirm = window.confirm("Вы уверены, что хотите удалить плейлист?");
    if (!confirm || !playlist) return;
    const response = await deletePlaylistFromDb(
      playlist.playlistId,
      playlist.userId,
    );

    const wasPlaylistDeletedFromDb = response.deletedCount;

    if (wasPlaylistDeletedFromDb) {
      deletePlaylist(playlist);
      router.push("/playlists");
    }
  };

  const onCheckboxChange = async (
    playlist: Playlist,
    video: Video,
    type: TheoryOrPractice,
  ) => {
    const response = await updateStatusInDb(playlist, video, type);
    const result = response.modifiedCount;

    if (result) {
      changeStatus(playlist, video.id, type);
    }
  };

  return (
    <>
      {playlist ? (
        <>
          <div>
            <div>
              <div className="mb-6 flex justify-between">
                <div className="flex gap-4">
                  <Link href="/playlists" className="flex items-center gap-2">
                    <Image
                      className="h-6 w-6"
                      width={24}
                      height={24}
                      src="/icons/arrow-small-left.svg"
                      alt="icon-arrow-small-left"
                    ></Image>
                    <p className="text-16">Назад</p>
                  </Link>
                  <StatusBage videos={playlist.videos} />
                </div>

                <a
                  onClick={onDeleteClick}
                  className="flex cursor-pointer items-center gap-2"
                >
                  <Image
                    className="h-6 w-6"
                    width={24}
                    height={24}
                    src="/icons/trash.svg"
                    alt="icon-trash"
                  ></Image>
                  <p className="text-16 text-red">Удалить плейлист</p>
                </a>
              </div>
              <h1 className="title-h1">{playlist.title}</h1>
            </div>
          </div>
          <div className="cards-gap flex flex-col">
            <div className="hidden items-center justify-between rounded-[20px] bg-white px-6 md:flex">
              <p className="text-16">Видео</p>
              <div className="flex gap-6">
                <div className="w-px flex-1 bg-black/20"></div>
                <div className="py-4">
                  <p className="text-16">Теория</p>
                </div>
                <div className="w-px flex-1 bg-black/20"></div>
                <div className="py-4">
                  <p className="text-16">Практика</p>
                </div>
                <div className="w-px flex-1 bg-black/20"></div>
                <div className="px-1 py-4">
                  <Image
                    className="h-4 w-4"
                    width={16}
                    height={16}
                    src="/icons/play-alt.svg"
                    alt="icon-play-alt"
                  ></Image>
                </div>
              </div>
            </div>
            {playlist.videos.map((video) => (
              <Link
                className="rounded-[20px] bg-white px-6 py-6 md:py-0"
                key={video.id}
                href={video.link}
                target="_blank"
              >
                <div className="flex flex-col gap-6 md:flex-row md:justify-between">
                  <h2 className="title-24-120 md:my-6">{video.title}</h2>
                  <div className="flex shrink-0 items-center gap-4 md:gap-6">
                    <div className="hidden h-full w-px bg-black/20 md:block"></div>
                    <div className="relative flex items-center gap-2">
                      <input
                        checked={video.theory}
                        onChange={() =>
                          onCheckboxChange(playlist, video, "theory")
                        }
                        className="md:absolute md:top-1/2 md:left-1/2 md:-translate-1/2"
                        type="checkbox"
                        id={"t-" + video.id}
                      />
                      <label
                        className="text-16 md:opacity-0"
                        htmlFor={"t-" + video.id}
                      >
                        Теория
                      </label>
                    </div>
                    <div className="hidden h-full w-px bg-black/20 md:block"></div>
                    <div className="relative flex items-center gap-2">
                      <input
                        checked={video.practice}
                        onChange={() =>
                          onCheckboxChange(playlist, video, "practice")
                        }
                        className="md:absolute md:top-1/2 md:left-1/2 md:-translate-1/2"
                        type="checkbox"
                        id={"p-" + video.id}
                      />
                      <label
                        className="text-16 md:opacity-0"
                        htmlFor={"p-" + video.id}
                      >
                        Практика
                      </label>
                    </div>
                    <div className="hidden h-full w-px bg-black/20 md:block"></div>
                    <Image
                      className="ml-auto h-6 w-6"
                      width={24}
                      height={24}
                      src="/icons/arrow-small-right.svg"
                      alt="icon-arrow-small-right"
                    ></Image>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </>
      ) : (
        <h1 className="title-h1">Загрузка...</h1>
      )}
    </>
  );
};

export default Page;
