import clsx from "clsx";
import { ReactNode } from "react";

type ButtonProps = {
  className?: string;
  children: ReactNode;
};

const Button = (props: ButtonProps) => {
  const { className, children } = props;

  return (
    <button
      className={clsx(
        "bg-red flex h-12 w-12 items-center justify-center rounded-full",
        className,
      )}
    >
      {children}
    </button>
  );
};

export default Button;
