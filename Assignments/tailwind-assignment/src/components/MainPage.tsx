import Content from "./Content";
import Sidebar from "./Sidebar";

const MainPage = () => {
  return (
    <div className="grid grid-cols-12 h-screen">
      <div className="hidden md:block transition-all duration-200 col-span-2 bg-white">
        <Sidebar />
      </div>
      <div className="col-span-12 md:col-span-10">
        <Content />
      </div>
    </div>
  );
};

export default MainPage;
