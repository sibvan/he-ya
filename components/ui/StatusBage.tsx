import { StatusBageProps, Video } from "@/types/playlists";
import Bage from "./Badge";

const StatusBage = (props: StatusBageProps) => {
  const { videos } = props;

  const getBage = (videos: Video[]) => {
    const grade = videos.reduce((acc, item) => {
      const gradeT = item.theory ? 0.5 : 0;
      const gradeP = item.practice ? 0.5 : 0;

      return acc + gradeP + gradeT;
    }, 0);

    const percent = Math.floor((grade / videos.length) * 100);

    if (percent === 100) {
      return <Bage color="green" text="Готово" />;
    } else {
      return <Bage color="blue" text={`${percent} %`} />;
    }
  };

  return <>{getBage(videos)}</>;
};

export default StatusBage;
