import { BageProps } from "@/types/playlists";
import clsx from "clsx";

const Bage = (props: BageProps) => {
  const { text, color } = props;

  return (
    <div
      className={clsx(
        "block w-fit rounded-full px-2 py-[6.5px]",
        color === "grey" && "bg-black/10",
        color === "blue" && "bg-light-blue",
        color === "green" && "bg-light-green",
      )}
    >
      <p
        className={clsx(
          "text-[11px]/[100%] font-bold",
          color === "grey" && "text-black",
          color === "blue" && "text-blue",
          color === "green" && "text-green",
        )}
      >
        {text}
      </p>
    </div>
  );
};

export default Bage;
