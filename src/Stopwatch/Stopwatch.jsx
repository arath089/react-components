import { useState, useEffect } from "react";

export default function Stopwatch() {
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [milliseconds, setMilliseconds] = useState(0);

  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;

  const display = `${String(minutes).padStart(2, "0")}:${String(
    remainingSeconds
  ).padStart(2, "0")}:${String(milliseconds).padStart(2, "0")}`;

  const handleStart = () => {
    setIsRunning(true);
  };

  const handleStop = () => {
    setIsRunning(false);
  };

  const handleReset = () => {
    setIsRunning(false);
    setMilliseconds(0);
    setSeconds(0);
  };

  useEffect(() => {
    let intervalId;
    if (isRunning) {
      // start interval, increment seconds
      intervalId = setInterval(() => {
        setMilliseconds((prev) => {
          if (prev >= 99) {
            setSeconds((s) => s + 1);
            return 0;
          }
          return prev + 1;
        });
      }, 10);
    }
    return () => clearInterval(intervalId);
  }, [isRunning]);

  return (
    <div className="flex w-full justify-center items-center flex-col gap-8">
      <div className="font-extrabold text-4xl md:text-6xl font-mono">
        {display}
      </div>
      <div className="gap-2 flex w-full justify-center items-center">
        <button
          onClick={handleStart}
          className={`px-4 py-2 rounded-md text-sm font-medium bg-blue-600 text-white hover:bg-red-800 transition-colors ${
            isRunning ? "opacity-50 cursor-not-allowed" : ""
          }`}
          disabled={isRunning}
        >
          Start
        </button>
        <button
          onClick={handleStop}
          className={`px-4 py-2 rounded-md text-sm font-medium bg-blue-600 text-white hover:bg-red-800 transition-colors ${
            !isRunning ? "opacity-50 cursor-not-allowed" : ""
          }`}
          disabled={!isRunning}
        >
          Stop
        </button>
        <button
          onClick={handleReset}
          className="px-4 py-2 rounded-md text-sm font-medium bg-blue-600 text-white hover:bg-red-800 transition-colors"
        >
          Reset
        </button>
      </div>
    </div>
  );
}

/*
DECOMPOSITION
1. what VALUES can change? a number counting up, is the timer running
2. Which changes UPDATE the UI? time change updates UI, started or stopped can update ui, reset can update ui
3. What does the USER do? User can click start to start, click stop to pause the timer, click reset to reset to 0
4. What does the UI show? running value when start is clicked  MM:SS format time, start, stop, reset buttons with their edge cases, 

MAPPING
"seconds(numnber) counting up" -> seconds -> useState(0)
"started or stopped" -> isRunning -> useState(false)
"start/stop/reset" -> 3 handler functions
"MM:SS display" -> derived from seconds
"timer ticking" -> useEffect with setInterval
*/
