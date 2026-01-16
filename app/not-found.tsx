import Placeholder from "@/components/blocks/Placeholder";
import NotFoundIcon from "@/components/icons/NotFoundIcon";

const NotFound = () => {
  return (
    <>
      <h1 className="title-h1">Ошибка 404</h1>
      <Placeholder
        title="Страница не найдена"
        subtitle="Попробуйте вернуться на главную"
        Icon={NotFoundIcon}
      />
    </>
  );
};

export default NotFound;
