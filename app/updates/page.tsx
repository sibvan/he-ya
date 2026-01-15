"use client";

import Status from "@/components/ui/Status";

const content = [
  {
    title: "Удаление плейлистов",
    date: "15.01.2026",
    description:
      "Добавил возможность удалять плейлисты. Для этого нужно перейти в плейлист и нажать соответствующую кнопку справа над его названием. Понимаю, что запуск проекта без этой функции выглядел странно, но мне было важно как можно быстрее стартовать — удаление стояло первым в очереди на добавление.",
  },
  {
    title: "Старт проекта",
    date: "14.01.2026",
    description:
      "В первую очередь я делаю проект для себя. Я начинающий разработчик и много учусь. Я пробовал разные форматы и пришёл к тому, что учиться по YouTube мне комфортнее всего. Но каждый раз вручную копировать названия всех роликов из плейлиста и вставлять их в таблицу было очень неудобно. Так и появилась идея этого проекта. Текущую версию я запускаю как MVP. У меня куча идей, а значит впереди ещё много обновлений.",
  },
];

const UpdatesPage = () => {
  return (
    <>
      <h1 className="title-h1">Обновления</h1>
      <div className="cards-grid">
        {content.map((item) => {
          return (
            <div key={`${item.date} · ${item.title}`} className="card py-6">
              <div className="flex flex-col gap-2 md:flex-row-reverse md:justify-between">
                <Status classList="" color="grey">
                  {item.date}
                </Status>
                <p className="title-24-120 mb-4 font-black">{item.title}</p>
              </div>
              <p className="text-16-145">{item.description}</p>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default UpdatesPage;
