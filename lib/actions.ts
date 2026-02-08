"use server";
import { Playlist, TheoryOrPractice, Video } from "@/types/playlists";
import { playlistsCollection } from "./db";

const addPlaylistToDb = async (playlist: Playlist) => {
  const isPlaylistInDb = await checkPlaylistInDb(
    playlist.playlistId,
    playlist.userId,
  );

  if (isPlaylistInDb) return;

  const response = await playlistsCollection.insertOne(playlist);
  const result = JSON.stringify(response);
  return result;
};

const deletePlaylistFromDb = async (playlistId: string, userId: string) => {
  const response = await playlistsCollection.deleteOne({ playlistId, userId });
  return response;
};

const checkPlaylistInDb = async (playlistId: string, userId: string) => {
  return (await playlistsCollection.findOne({
    userId,
    playlistId,
  }))
    ? true
    : false;
};

const getPlaylistsFromDb = async (userId: string) => {
  const response = await playlistsCollection.find({ userId }).toArray();
  return response.map(({ playlistId, userId, title, videos, date }) => ({
    playlistId,
    userId,
    title,
    videos,
    date,
  }));
};

const updateStatusInDb = async (
  playlist: Playlist,
  video: Video,
  type: TheoryOrPractice,
) => {
  const filter = {
    userId: playlist.userId,
    playlistId: playlist.playlistId,
    "videos.id": video.id,
  };

  const updateDocument = {
    $set: {
      date: Date.now(),
      [`videos.$.${type}`]: !video[type],
    },
  };

  const result = await playlistsCollection.updateOne(filter, updateDocument);
  return result;
};

export {
  addPlaylistToDb,
  getPlaylistsFromDb,
  deletePlaylistFromDb,
  updateStatusInDb,
};
