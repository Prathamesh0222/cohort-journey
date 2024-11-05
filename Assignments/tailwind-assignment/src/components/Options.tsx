import { CalendarClock, Plus, Videotape } from "lucide-react";

const icons = {
  CalendarClock: <CalendarClock size={35} />,
  Plus: <Plus size={35} />,
  Videotape: <Videotape size={35} />,
};

const Options = () => {
  return (
    <div className="flex flex-col items-center space-y-8">
      <div className="grid grid-cols-2 gap-12">
        <div className="col-span-1 flex flex-col items-center">
          <button className="flex items-center gap-2 bg-black text-white p-5 rounded-lg">
            {icons.CalendarClock}
          </button>
          <p className="text-sm font-bold mt-2 text-center">
            Schedule a Webinar
          </p>
        </div>
        <div className="col-span-1 flex flex-col items-center">
          <button className="flex items-center gap-2 bg-black text-white p-5 rounded-lg">
            {icons.Plus}
          </button>
          <p className="text-sm font-bold mt-2">Join a Webinar</p>
        </div>
      </div>
      <div className="flex flex-col items-center">
        <button className="flex items-center gap-2 bg-black text-white p-5 rounded-lg">
          {icons.Videotape}
        </button>
        <p className="text-sm font-bold mt-2">Open Recording</p>
      </div>
    </div>
  );
};

export default Options;
