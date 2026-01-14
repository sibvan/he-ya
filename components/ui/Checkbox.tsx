import clsx from "clsx";
import Image from "next/image";

type CheckboxProps = {
  className?: string;
  done: boolean;
};

const Checkbox = (props: CheckboxProps) => {
  const { className, done } = props;

  return (
    <div
      className={clsx(
        "flex h-6 w-6 items-center justify-center rounded-[5px]",
        className,
        done ? "bg-light-green" : "bg-light-blue",
      )}
    >
      {done && (
        <Image
          className="h-6 w-6"
          alt="checkbox"
          width={24}
          height={24}
          src="/icons/checkbox-mark.svg"
        ></Image>
      )}
    </div>
  );
};

export default Checkbox;
