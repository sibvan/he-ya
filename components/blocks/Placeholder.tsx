import { ReactNode } from "react";
import Image from "next/image";

type PlaceholderProps = {
  title: string;
  subtitle: string;
  icon: string;
};

const Placeholder = (props: PlaceholderProps) => {
  const { icon, title, subtitle } = props;

  return (
    <div className="relative top-[calc(100px/3)] my-auto flex flex-col items-center md:top-[calc(100px/3*2)] xl:top-[calc(100px/1)]">
      <Image
        className="mb-6 h-16 w-16"
        alt={icon}
        width={64}
        height={64}
        src={`/icons/${icon}.svg`}
      ></Image>
      <p className="text-24 mb-2 text-center font-bold">{title}</p>
      <p className="text-16 text-center">{subtitle}</p>
    </div>
  );
};

export default Placeholder;
