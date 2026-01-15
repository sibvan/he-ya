"use client";

import { useParams } from "next/navigation";
import { usePlaylistsStore } from "@/stores/usePlaylistsStore";
import clsx from "clsx";
import { usePlaylist } from "@/hooks/usePlaylist";
import Link from "next/link";
import Image from "next/image";
import Status from "@/components/ui/Status";
import Checkbox from "@/components/ui/Checkbox";
import { useRouter } from "next/navigation";

const PlaylistPage = () => {
  const params = useParams();
  const id = typeof params.id === "string" ? params.id : "";
  const router = useRouter();

  const playlist = usePlaylistsStore((state) => state.findPlaylistById(id));
  const changeStatus = usePlaylistsStore((state) => state.changeStatus);
  const deletePlaylist = usePlaylistsStore((state) => state.deletePlaylist);
  const title = playlist?.title || "";
  const videos = playlist?.videos || [];

  const { getPercent } = usePlaylist();

  const percent = getPercent(videos);

  const deletePlaylistOnClickHandle = () => {
    const confirm = window.confirm("Вы уверены, что хотите удалить плейлист?");
    if (confirm) {
      deletePlaylist(id);
      router.push(`/playlists/`);
    }
  };

  return (
    <>
      <div className="">
        <div className="mb-6 flex justify-between gap-4">
          <div className="flex shrink-0 items-center gap-4">
            <Link
              href="/playlists"
              className="flex cursor-pointer items-center gap-2"
            >
              <Image
                className="h-6 w-6"
                alt="back"
                width={24}
                height={24}
                src="/icons/back.svg"
              ></Image>
              <p className="text-16">Назад</p>
            </Link>
            <Status color={percent === 100 ? "green" : "blue"}>
              {percent === 100 ? "Закончил" : `${percent} %`}
            </Status>
          </div>
          <div
            onClick={deletePlaylistOnClickHandle}
            className="flex cursor-pointer items-center gap-2"
          >
            <Image
              className="h-6 w-6"
              alt="trash"
              width={24}
              height={24}
              src="/icons/trash.svg"
            ></Image>
            <p className="text-16 text-red truncate">Удалить плейлист</p>
          </div>
        </div>
        <h1 className="title-h1">{title}</h1>
      </div>
      <div>
        <div className="card box mb-6 hidden justify-between md:flex">
          <div>
            <p className="text-16 my-6">Видео</p>
          </div>
          <div className="flex items-center gap-6">
            <div className="bg-grey h-full w-px"></div>
            <p className="text-16">Теория</p>
            <div className="bg-grey h-full w-px"></div>
            <p className="text-16">Практика</p>
          </div>
        </div>
        <div className="cards-grid">
          {videos?.map((video) => {
            return (
              <a
                className="card flex flex-col justify-between gap-6 py-6 md:flex-row md:py-0"
                // href={video.url}
                target="_blank"
                key={video.id}
              >
                <p
                  className={clsx(
                    "title-24-120 md:my-6",
                    video.theory && video.practice && "line-through opacity-50",
                  )}
                >
                  {video.title}
                </p>
                <div className="flex gap-4 md:gap-6">
                  <div className="bg-grey hidden h-full w-px md:block"></div>
                  <div
                    onClick={() => changeStatus(id, video.id, "theory")}
                    className="relative flex cursor-pointer items-center gap-2"
                  >
                    <Checkbox
                      done={video.theory}
                      className="md:absolute md:right-0 md:left-0 md:m-auto"
                    />
                    <p className="text-16 md:invisible">Теория</p>
                  </div>
                  <div className="bg-grey hidden h-full w-px md:block"></div>
                  <div
                    onClick={() => changeStatus(id, video.id, "practice")}
                    className="relative flex cursor-pointer items-center gap-2"
                  >
                    <Checkbox
                      done={video.practice}
                      className="md:absolute md:right-0 md:left-0 md:m-auto"
                    />
                    <p className="text-16 md:invisible">Практика</p>
                  </div>
                </div>
              </a>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default PlaylistPage;
