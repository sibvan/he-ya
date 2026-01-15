import Placeholder from "@/components/blocks/Placeholder";

const NotFound = () => {
  return (
    <>
      <h1 className="title-h1">Ошибка 404</h1>
      <Placeholder
        title="Страница не найдена"
        subtitle="Попробуйте вернуться на главную"
        icon="404"
      />
    </>
  );
};

export default NotFound;
