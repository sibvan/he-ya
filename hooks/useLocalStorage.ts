import { useEffect } from "react";
import { usePlaylistsStore } from "@/stores/usePlaylistsStore";

export const useLocalStorage = () => {
  const playlists = usePlaylistsStore((state) => state.playlists);
  const setPlaylists = usePlaylistsStore((state) => state.setPlaylists);

  useEffect(() => {
    const local = localStorage.getItem("playlists");
    if (local) setPlaylists(JSON.parse(local));
  }, [setPlaylists]);

  useEffect(() => {
    localStorage.setItem("playlists", JSON.stringify(playlists));
  }, [playlists]);

  return {};
};
