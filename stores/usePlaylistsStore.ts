import { create } from "zustand";

type Video = {
  id: string;
  theory: boolean;
  practice: boolean;
  title: string;
  url: string;
};

type VideoFeature = "theory" | "practice";

type Playlist = {
  id: string;
  title: string;
  url: string;
  videos: Video[];
  date: number;
};

type PlaylistsStore = {
  playlists: Playlist[];
  getPlaylistNum: () => number;

  setPlaylists: (playlists: Playlist[]) => void;
  addPlaylist: (playlist: Playlist) => void;
  deletePlaylist: (id: string) => void;
  findPlaylistById: (id: string) => Playlist | undefined;
  changeStatus: (
    playlistId: string,
    videoId: string,
    feature: VideoFeature,
  ) => void;
};

export const usePlaylistsStore = create<PlaylistsStore>((set, get) => ({
  playlists: [],

  getPlaylistNum: () => {
    return get().playlists.length;
  },

  setPlaylists: (playlists) => {
    set({ playlists });
  },

  findPlaylistById: (id: string) =>
    get().playlists.find((playlist) => playlist.id === id),

  changeStatus: (playlistId, videoId, feature) => {
    set((state) => ({
      playlists: state.playlists.map((playlist) =>
        playlist.id !== playlistId
          ? playlist
          : {
              ...playlist,
              date: Date.now(),
              videos: playlist.videos.map((video) =>
                video.id === videoId
                  ? { ...video, [feature]: !video[feature] }
                  : video,
              ),
            },
      ),
    }));
  },

  addPlaylist: (playlist) => {
    const exists = get().playlists.some((p) => p.id === playlist.id);
    if (!exists) {
      set((state) => ({
        playlists: [...state.playlists, { ...playlist, date: Date.now() }],
      }));
    }
  },

  deletePlaylist: (id) => {
    const filteredPlaylists = get().playlists.filter(
      (playlist) => playlist.id !== id,
    );
    set({ playlists: filteredPlaylists });
  },
}));
