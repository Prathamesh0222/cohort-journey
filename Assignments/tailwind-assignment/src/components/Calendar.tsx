import {
  Calendar,
  ChevronDown,
  MoveLeft,
  MoveRight,
  Video,
} from "lucide-react";

const Calandar = () => {
  const constants = {
    blockOne: {
      time: "7:30 PM",
      title: "UI/UX Webinar",
      event: "Live",
    },
    blockTwo: {
      time: "9:30 PM",
      title: "ReactJS Webinar",
      event: "Upcoming",
    },
    blockThree: {
      time: "11:30 AM",
      title: "NodeJS Webinar",
      event: "Upcoming",
    },
    blockFour: {
      time: "1:30 PM",
      title: "MongoDB Webinar",
      event: "Upcoming",
    },
  };

  return (
    <div>
      <div className="flex justify-between bg-cyan-200 p-2 rounded-lg">
        <div className="flex items-center gap-2">
          <span>
            <Calendar />
          </span>
          <p>Tuesday, 5th November 2024</p>
          <span>
            <ChevronDown size={15} />
          </span>
        </div>
        <span className="flex gap-2">
          <MoveLeft className="text-gray-500 hover:bg-cyan-500" />
          <MoveRight className=" text-gray-500 hover:bg-cyan-500" />
        </span>
      </div>
      <div className="mt-2">
        {Object.values(constants).map((content, index) => (
          <div
            key={index}
            className={`grid grid-cols-12 py-2 ${
              index === Object.values(constants).length - 1 ? "" : "border-b"
            }`}
          >
            <div className="col-span-2 border-r">
              <span className="text-lg font-semibold">{content.time}</span>
              <div>
                <span className="text-sm text-gray-500">{content.time}</span>
              </div>
            </div>
            <div className="col-span-10 px-2">
              <div className="flex items-center gap-2">
                <span>{content.event}</span>
                <Video size={20} />
              </div>
              <span className="text-lg font-semibold">{content.title}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Calandar;
