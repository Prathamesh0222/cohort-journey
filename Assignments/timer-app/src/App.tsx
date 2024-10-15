import { useEffect, useState } from "react";

function App() {
  const [timer, setTimer] = useState<number>(0);
  const [isActive, setIsActive] = useState<boolean>(false);

  useEffect(() => {
    if (isActive) {
      const interval = setInterval(() => {
        setTimer((c) => c! + 1);
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [isActive]);

  const handleStartTimer = () => {
    setIsActive(true);
  };

  const handleStopTimer = () => {
    setIsActive(false);
  };

  const handleResetTimer = () => {
    setTimer(0);
    setIsActive(false);
  };

  const formatTimer = (timeInSeconds: number) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;
    return `${minutes.toString().padStart(2, "0")}: ${seconds.toString().padStart(2, "0")}`;
  };

  return (
    <div className="flex flex-col bg-gradient-to-br from-purple-800 via-purple-900 to-purple-950 justify-center h-screen">
      <div className="flex justify-center">
        <div className="border p-8 rounded-xl bg-blue-900">
          <div>
            <span className="text-7xl text-white flex justify-center">
              {formatTimer(timer)}
            </span>
          </div>
          <div className="mt-12 space-x-4">
            <button
              className="bg-blue-500 p-2.5 rounded-xl"
              onClick={handleStartTimer}
            >
              Start the Timer
            </button>
            <button
              className="bg-red-500 p-2.5 rounded-xl"
              onClick={handleStopTimer}
            >
              Stop the Timer
            </button>
            <button
              className="bg-green-500 p-2.5 rounded-xl"
              onClick={handleResetTimer}
            >
              Reset the Timer
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
