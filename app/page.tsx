"use client";

import { useState } from "react";
import { authClient, signIn } from "@/lib/auth-client";
import {
  addPlaylistToDb,
  deletePlaylistFromDb,
  updateStatusInDb,
} from "@/lib/actions";
import { usePlaylistsStore } from "@/stores/playlistsStore";
import { Playlist, TheoryOrPractice, Video } from "@/types/playlists";

export default function Home() {
  const playlists = usePlaylistsStore((state) => state.playlists);
  const addPlaylist = usePlaylistsStore((state) => state.addPlaylist);
  const deletePlaylist = usePlaylistsStore((state) => state.deletePlaylist);
  const changeStatus = usePlaylistsStore((state) => state.changeStatus);

  const [link, setLink] = useState(
    "https://www.youtube.com/playlist?list=PLC3y8-rFHvwhIEc4I4YsRz5C7GOBnxSJY",
  );

  const { data: session } = authClient.useSession();

  const onFormSubmit = async (event: React.SyntheticEvent) => {
    event.preventDefault();
    const playlistId = getPlaylistId(link);
    if (!playlistId) return;
    if (!session) signIn();
    const wasPlaylistAdded = await addPlaylistToDbAndStore(playlistId);
  };

  const onButtonClick = async (playlist: Playlist) => {
    const response = await deletePlaylistFromDb(
      playlist.playlistId,
      playlist.userId,
    );

    const wasPlaylistDeletedFromDb = response.deletedCount;

    if (wasPlaylistDeletedFromDb) {
      deletePlaylist(playlist);
    }
  };

  const addPlaylistToDbAndStore = async (playlistId: string) => {
    const playlist = {
      ...(await fetchPlaylist(playlistId)),
      userId: session?.user.id,
    };

    const wasPlaylistAddedToDb = await addPlaylistToDb(playlist);

    if (wasPlaylistAddedToDb) {
      addPlaylist(playlist);
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
      <form onSubmit={onFormSubmit}>
        <input
          value={link}
          onChange={(e) => setLink(e.target.value)}
          type="text"
        />
        <input type="submit" value="Добавить" />
      </form>
      <hr />
      {playlists.map((playlist) => (
        <div key={playlist.playlistId}>
          <p>{playlist.title}</p>
          <button onClick={() => onButtonClick(playlist)}>Удалить</button>

          {playlist.videos.map((video) => (
            <div key={video.id}>
              <br />
              <p>{video.title}</p>
              <div>
                <input
                  checked={video.theory}
                  onChange={() => onCheckboxChange(playlist, video, "theory")}
                  type="checkbox"
                />
                <label>Теория</label>
              </div>

              <div>
                <input
                  checked={video.practice}
                  onChange={() => onCheckboxChange(playlist, video, "practice")}
                  type="checkbox"
                />
                <label>Практика</label>
              </div>
            </div>
          ))}
          <hr />
        </div>
      ))}
    </>
  );
}
