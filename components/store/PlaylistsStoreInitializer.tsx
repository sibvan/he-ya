"use client";

import { usePlaylistsStore } from "@/stores/playlistsStore";
import { authClient } from "@/lib/auth-client";
import { getPlaylistsFromDb } from "@/lib/actions";
import { useEffect } from "react";

const PlaylistsStoreInitializer = () => {
  const setPlaylists = usePlaylistsStore((state) => state.setPlaylists);

  const { data: session } = authClient.useSession();

  useEffect(() => {
    const loadPlaylists = async () => {
      if (session) {
        const playlists = await getPlaylistsFromDb(session.user.id);
        setPlaylists(playlists);
      } else {
        setPlaylists([]);
      }
    };
    loadPlaylists();
  }, [session, setPlaylists]);

  return null;
};

export default PlaylistsStoreInitializer;
