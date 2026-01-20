import { useLoading } from "./useLoading";
import { useState } from "react";
import { usePlaylistsStore } from "@/stores/usePlaylistsStore";

type Video = {
  id: string;
  theory: boolean;
  practice: boolean;
  title: string;
};

export const usePlaylist = () => {
  const addPlaylist = usePlaylistsStore((state) => state.addPlaylist);
  const findPlaylistById = usePlaylistsStore((state) => state.findPlaylistById);
  const { setError, setIsLoading, isLoading, error } = useLoading();

  const [url, setUrl] = useState("");

  const getList = async () => {
    if (url.trim().length === 0) {
      setError("Вы ничего не ввели в поле");
      return;
    }

    let id = null;
    let type = "";

    try {
      const params = new URL(url).searchParams;

      if (params.has("v")) {
        id = params.get("v");
        type = "video";
      }

      if (params.has("list")) {
        id = params.get("list");
        type = "playlist";
      }
      if (!id) throw new Error("Не удалось определить id видео или плейлиста");
    } catch (e: unknown) {
      setError(
        e instanceof Error
          ? e.message
          : "Ссылка должна вести на плейлист или видео YouTube",
      );
      return;
    }

    try {
      setIsLoading(true);
      setError("");

      const localPlaylist = findPlaylistById(id);
      if (!localPlaylist) {
        const res = await fetch("/api/" + type + "/" + id);
        const data = await res.json();

        addPlaylist(data);
      }

      return id;
    } catch {
      setError("Не удалось загрузить");
    } finally {
      setIsLoading(false);
    }
  };

  const getPercent = (videos: Video[]) => {
    return Math.floor(
      videos.reduce((result, video) => {
        const mark =
          video.theory && video.practice
            ? 1
            : video.theory || video.practice
              ? 0.5
              : 0;
        return result + (mark / videos.length) * 100;
      }, 0),
    );
  };

  return { getList, url, setUrl, setError, isLoading, error, getPercent };
};
