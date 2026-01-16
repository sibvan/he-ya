import clsx from "clsx";

type BurgerProps = {
  className?: string;
  onClick: () => void;
};

const Burger = (props: BurgerProps) => {
  const { className, onClick } = props;

  return (
    <button
      onClick={onClick}
      className={clsx(className, "group flex h-6 w-6 flex-col justify-around")}
    >
      <div className="h-0.5 w-full rounded-full bg-black transition duration-300 ease-in-out group-[.open]:translate-y-2 group-[.open]:-rotate-45"></div>
      <div className="h-0.5 w-full rounded-full bg-black transition duration-300 ease-in-out group-[.open]:translate-x-9"></div>
      <div className="h-0.5 w-full rounded-full bg-black transition duration-300 ease-in-out group-[.open]:-translate-y-2 group-[.open]:rotate-45"></div>
    </button>
  );
};

export default Burger;
