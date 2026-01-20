import { NextResponse, NextRequest } from "next/server";

const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY;

export const GET = async (
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) => {
  const id = (await params).id;

  const res = await fetch(
    `https://www.googleapis.com/youtube/v3/videos?id=${id}&part=snippet&key=${YOUTUBE_API_KEY}`,
  );
  const data = await res.json();

  const { title, description } = data.items[0].snippet;

  const timeCodes = getTimeCodes(description);

  const videos =
    timeCodes.length > 0
      ? timeCodes.map((item, order) => ({
          id: id + "-" + order,
          title: item,
          url: `https://www.youtube.com/watch?v=${id}`,
          theory: false,
          practice: false,
        }))
      : [
          {
            id: id,
            title,
            url: `https://www.youtube.com/watch?v=${id}`,
            theory: false,
            practice: false,
          },
        ];

  return NextResponse.json({ videos, title, id });
};

const getTimeCodes = (description: string) => {
  return description
    .split("\n")
    .filter((str) => /^(\d{1,2}:\d{2}|\d{1,2}:\d{2}:\d{2})\s+\S+/.test(str));
};
