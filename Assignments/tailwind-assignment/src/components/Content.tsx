import Calandar from "./Calendar";
import Options from "./Options";

const Content = () => {
  const imageUrl = {
    Avatar:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSra-sEWnL5IQMwZLGxbWYzwdtXJ9djaLD8WA&s",
    Background:
      "https://images.unsplash.com/photo-1693648793394-0b76b7eb042e?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8cGl0Y2glMjBibGFja3xlbnwwfHwwfHx8MA%3D%3D",
  };

  const ProfileConstants = {
    Name: "Prathamesh Pimpalkar",
    Email: "prathamesh@gmail.com",
    Phone: "9999997890",
    Location: "Mumbai, India",
  };

  return (
    <div>
      <div className="h-40 bg-black">
        <img src={imageUrl.Background} className="object-cover w-full h-full" />
      </div>
      <div className="grid grid-cols-10 gap-8 p-8 min-h-screen">
        <div className="h-80 w-full col-span-8 md:col-span-2 md:-translate-y-12 bg-white rounded-xl shadow-lg">
          <div className="flex justify-center p-4">
            <img
              src={imageUrl.Avatar}
              alt="Vegeta"
              className="md:w-32 md:h-32 object-cover rounded-full"
            />
          </div>
          <div className="mx-auto text-center">
            <h1 className="font-bold text-md mt-2">{ProfileConstants.Name}</h1>
            <p className="text-gray-700 text-sm">{ProfileConstants.Email}</p>
            <p className="text-gray-700 text-sm">{ProfileConstants.Phone}</p>
            <p className="mt-8 text-gray-700 text-sm">
              {ProfileConstants.Location}
            </p>
          </div>
        </div>
        <div className="col-span-8 md:col-span-5">
          <div className="hidden md:block">
            <p className="text-gray-700">4th November 2024</p>
            <h1 className="text-2xl font-bold text-blue-700">
              Good Morning DeadShot!👋
            </h1>
          </div>
          <div className="mt-12 h-96 p-8 bg-red-500 rounded-xl shadow-lg">
            <Calandar />
          </div>
        </div>
        <div className="mt-36 h-80 p-8 col-span-8 md:col-span-3 -translate-y-10 bg-yellow-500 rounded-xl shadow-lg">
          <Options />
        </div>
      </div>
    </div>
  );
};

export default Content;