import { NextResponse, NextRequest } from "next/server";

// Добавить try catch, типизировать item

type VideoListItem = {
  snippet: {
    title: string;
    resourceId: { videoId: string };
  };

  url: string;
  theory: boolean;
  practice: boolean;
};

const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY;

export const GET = async (
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) => {
  const videos = [];
  const id = (await params).id;
  let nextPageToken = "";
  const titleObject = await getPlaylistTitle(id);
  const title = titleObject.items[0].snippet.title;

  do {
    const data = await getNextPageVideos(id, nextPageToken);
    const videoList = data.items.map((item: VideoListItem) => ({
      id: item.snippet.resourceId.videoId,
      title: item.snippet.title,
      url: `https://www.youtube.com/watch?v=${item.snippet.resourceId.videoId}&list=${id}`,
      theory: false,
      practice: false,
    }));
    videos.push(...videoList);
    nextPageToken = data.nextPageToken;
  } while (nextPageToken);

  return NextResponse.json({ videos, title, id });
};

const getNextPageVideos = async (id: string, nextPageToken: string) => {
  const res = await fetch(
    `https://www.googleapis.com/youtube/v3/playlistItems?playlistId=${id}&part=snippet&maxResults=50&key=${YOUTUBE_API_KEY}${nextPageToken ? `&pageToken=${nextPageToken}` : ""}`,
  );
  const data = await res.json();

  return data;
};

const getPlaylistTitle = async (id: string) => {
  const res = await fetch(
    `https://www.googleapis.com/youtube/v3/playlists?part=snippet&id=${id}&key=${YOUTUBE_API_KEY}`,
  );
  const data = await res.json();

  return data;
};
