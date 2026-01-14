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

  const getVideos = async () => {
    let id;

    if (url.trim().length === 0) {
      setError("Вы ничего не ввели в поле");
      return;
    }

    try {
      id = new URL(url).searchParams.get("list");
      if (!id) {
        setError("Ссылка должна вести на плейлист YouTube");
        return;
      }
    } catch {
      setError("Ссылка должна вести на плейлист YouTube");
      return;
    }

    try {
      setIsLoading(true);
      setError("");

      const localPlaylist = findPlaylistById(id);
      if (!localPlaylist) {
        const res = await fetch("/api/youtube/" + id);
        const data = await res.json();
        addPlaylist(data);
      }

      return id;
    } catch {
      setError("Не удалось загрузить видео из плейлиста");
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

  return { getVideos, url, setUrl, setError, isLoading, error, getPercent };
};
