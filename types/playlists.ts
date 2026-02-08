type PlaylistsStore = {
  playlists: Playlist[];
  setPlaylists: (playlists: Playlist[]) => void;
  addPlaylist: (playlist: Playlist) => void;
  deletePlaylist: (playlist: Playlist) => void;
  changeStatus: (
    playlist: Playlist,
    videoId: string,
    type: TheoryOrPractice,
  ) => void;
};

type TheoryOrPractice = "theory" | "practice";

type Video = {
  id: string;
  link: string;
  practice: boolean;
  theory: boolean;
  title: string;
};

type Playlist = {
  playlistId: string;
  userId: string;
  title: string;
  videos: Video[];
  date: number;
};

type YoutubeVideo = {
  snippet: {
    title: string;
    resourceId: { videoId: string };
  };
  id: string;
};

type BageProps = {
  text: string | number;
  color: "grey" | "blue" | "green";
};

type StatusBageProps = {
  videos: Video[];
};

export type {
  Playlist,
  YoutubeVideo,
  PlaylistsStore,
  Video,
  TheoryOrPractice,
  BageProps,
  StatusBageProps,
};
