import { YoutubeVideo } from "@/types/playlists";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (
  request: NextRequest,
  { params }: { params: Promise<{ playlistId: string }> },
) => {
  const playlistId = (await params).playlistId;

  const [title, videos] = await Promise.all([
    getTitle(playlistId),
    getVideos(playlistId),
  ]);

  const playlist = { title, videos, playlistId, date: Date.now() };

  return NextResponse.json(playlist);
};

const getTitle = async (playlistId: string) => {
  const response = await fetch(
    `https://www.googleapis.com/youtube/v3/playlists?part=snippet&id=${playlistId}&key=${process.env.YOUTUBE_API_KEY}`,
  );
  const result = await response.json();
  const title = result.items[0].snippet.title;
  return title;
};

const getVideos = async (playlistId: string) => {
  const response = await fetch(
    `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=50&playlistId=${playlistId}&key=${process.env.YOUTUBE_API_KEY}`,
  );
  const result = await response.json();

  const videos = result.items.map((video: YoutubeVideo) => ({
    title: video.snippet.title,
    id: video.id,
    theory: false,
    practice: false,
    link: `https://www.youtube.com/watch?v=${video.snippet.resourceId.videoId}&list=${playlistId}`,
  }));

  return videos;
};
