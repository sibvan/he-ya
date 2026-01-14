import { ReactNode } from "react";
import clsx from "clsx";

type StatusProps = {
  children: ReactNode;
  color: string;
  classList?: string;
};

const Status = (props: StatusProps) => {
  const { children, color, classList } = props;

  return (
    <span
      className={clsx(
        "flex h-6 w-fit shrink-0 items-center rounded-full px-2 text-[11px]/[100%] font-bold",
        color === "grey" && "bg-black/10 text-black",
        color === "blue" && "bg-light-blue text-blue",
        color === "green" && "bg-light-green text-green",
        classList,
      )}
    >
      {children}
    </span>
  );
};

export default Status;
