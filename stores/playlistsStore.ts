import { create } from "zustand";
import type { PlaylistsStore } from "@/types/playlists";

const usePlaylistsStore = create<PlaylistsStore>((set, get) => ({
  playlists: [],
  setPlaylists: (playlists) => set({ playlists }),

  addPlaylist: (playlist) =>
    set((state) => ({ playlists: [...state.playlists, playlist] })),

  deletePlaylist: (playlist) =>
    set((state) => ({
      playlists: state.playlists.filter(
        (p) => p.playlistId !== playlist.playlistId,
      ),
    })),

  changeStatus: (playlist, videoId, type) => {
    const updatedPlaylists = get().playlists.map((p) => {
      if (p.playlistId === playlist.playlistId) {
        const updatedVideos = p.videos.map((v) => {
          if (v.id === videoId) {
            return { ...v, [type]: !v[type] };
          }
          return v;
        });
        return { ...p, videos: updatedVideos, date: Date.now() };
      }
      return p;
    });
    set(() => ({ playlists: updatedPlaylists }));
  },

  // findPlaylistById: (id) => {
  //   return get().playlists.find((playlist) => playlist.playlistId === id);
  // },
}));

export { usePlaylistsStore };
