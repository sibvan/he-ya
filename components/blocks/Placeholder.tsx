import { FC } from "react";

type PlaceholderProps = {
  title: string;
  subtitle: string;
  Icon: FC<React.SVGProps<SVGSVGElement>>;
};

const Placeholder = (props: PlaceholderProps) => {
  const { Icon, title, subtitle } = props;

  return (
    <div className="relative top-[calc(100px/3)] my-auto flex flex-col items-center md:top-[calc(100px/3*2)] xl:top-[calc(100px/1)]">
      <Icon className="mb-6 h-16 w-16 text-black" />
      <p className="text-24 mb-2 text-center font-bold">{title}</p>
      <p className="text-16 text-center">{subtitle}</p>
    </div>
  );
};

export default Placeholder;
