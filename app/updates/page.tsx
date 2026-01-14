"use client";

import Status from "@/components/ui/Status";

const UpdatesPage = () => {
  return (
    <>
      <h1 className="title-h1">Обновления</h1>
      <div className="cards-grid">
        <div className="card py-6">
          <div className="flex flex-col gap-2 md:flex-row-reverse md:justify-between">
            <Status classList="" color="grey">
              15.01.2026
            </Status>
            <p className="title-24-120 mb-4 font-black">Старт проекта</p>
          </div>
          <p className="text-16-145">
            В первую очередь я делаю проект для себя. Я начинающий разработчик и
            много учусь. Я пробовал разные форматы и пришёл к тому, что учиться
            по YouTube мне комфортнее всего. Но каждый раз вручную копировать
            названия всех роликов из плейлиста и вставлять их в таблицу было
            очень неудобно. Так и появилась идея этого проекта. Текущую версию я
            запускаю как MVP. У меня куча идей, а значит впереди ещё много
            обновлений.
          </p>
        </div>
      </div>
      {/* <div className="cards-grid">
        {playlists.map((playlist) => {
          const percent = getPercent(playlist.videos);

          return (
            <Link
              href={`/playlists/${playlist.id}`}
              className="card grid grid-cols-[1fr_auto] gap-4 py-6"
              key={playlist.id}
            >
              <p className="title-24-120 col-span-2 font-black md:-order-3 md:col-span-1">
                {playlist.title}
              </p>
              <p className="text-16 self-center md:-order-1">
                {playlist.videos.length} видео
              </p>

              <Status
                classList="md:-order-2"
                color={percent === 100 ? "green" : "blue"}
              >
                {percent === 100 ? "Закончил" : `${percent} %`}
              </Status>
            </Link>
          );
        })}
      </div> */}
    </>
  );
};

export default UpdatesPage;
