import { useEffect, useState, useRef } from "react";

function throttle(fn, delay) {
  let isActive = false;

  return function (...args) {
    // in cooldown
    if (isActive) return;

    // fire the function
    fn(...args);

    // start the cooldown
    isActive = true;
    setTimeout(() => {
      isActive = false; // cooldown over
    }, delay);
  };
}

export default function ThrottledSearch() {
  const [isThrottled, setIsThrottled] = useState(false);
  const [secondsLeft, setSecondsLeft] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [lastSubmittedAt, setLastSubmittedAt] = useState(null);

  // Metrics
  const [clicks, setClicks] = useState(0);
  const [apiCalls, setApiCalls] = useState(0);
  const blocked = clicks - apiCalls;

  const throttledSubmit = useRef(
    throttle(async () => {
      setIsSubmitting(true);
      setApiCalls((prev) => prev + 1);

      await new Promise((resolve) => setTimeout(resolve, 400));

      setIsSubmitting(false);
      setLastSubmittedAt(new Date().toLocaleTimeString());
      setIsThrottled(true);
      setSecondsLeft(2);
    }, 2000)
  ).current;

  useEffect(() => {
    if (!isThrottled) return;

    const intervalId = setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev <= 1) {
          clearInterval(intervalId);
          setIsThrottled(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(intervalId);
  }, [isThrottled]);

  return (
    <div className="mx-auto flex w-full max-w-md flex-col gap-4">
      <button
        onClick={() => {
          setClicks((prev) => prev + 1);
          throttledSubmit();
        }}
        className={`rounded-md px-4 py-2 text-sm font-semibold text-white shadow-sm transition ${
          isThrottled
            ? "cursor-not-allowed bg-gray-300"
            : "bg-blue-600 hover:bg-blue-700"
        }`}
      >
        Submit
      </button>

      <div className="grid grid-cols-3 gap-2">
        <div className="flex flex-col items-center gap-1 rounded-md border border-gray-200 bg-white p-3 text-center shadow-sm">
          <span className="text-2xl font-bold text-red-500">{clicks}</span>
          <span className="text-xs font-medium uppercase tracking-wide text-gray-500">
            Clicks
          </span>
        </div>
        <div className="flex flex-col items-center gap-1 rounded-md border border-gray-200 bg-white p-3 text-center shadow-sm">
          <span className="text-2xl font-bold text-blue-600">{apiCalls}</span>
          <span className="text-xs font-medium uppercase tracking-wide text-gray-500">
            API Calls
          </span>
        </div>
        <div className="flex flex-col items-center gap-1 rounded-md border border-gray-200 bg-white p-3 text-center shadow-sm">
          <span className="text-2xl font-bold text-green-600">{blocked}</span>
          <span className="text-xs font-medium uppercase tracking-wide text-gray-500">
            Blocked
          </span>
        </div>
      </div>

      {isSubmitting && <p className="text-sm text-gray-500">Submitting...</p>}
      {isThrottled && !isSubmitting && (
        <p className="rounded-md border border-amber-200 bg-amber-50 p-3 text-sm text-amber-700">
          Cooling down — try again in {secondsLeft}s
        </p>
      )}
      {lastSubmittedAt && !isThrottled && !isSubmitting && (
        <p className="rounded-md border border-green-200 bg-green-50 p-3 text-sm text-green-700">
          Last submitted at {lastSubmittedAt}
        </p>
      )}
    </div>
  );
}

/*
DECOMPOSITION
1. What values can change? Cooldown indicator, submitting state, click/API-call metrics
2. Which changes UPDATE the UI? all of them
3. What does the USER do? User clicks Submit, possibly rapidly, during the cooldown window
4. What does the UI show? Submitting state, then a cooldown message with seconds remaining,
   plus metrics showing total clicks vs. API calls that actually fired vs. clicks throttle blocked

MAPPING:
"throttle till 2000ms" -> isThrottled -> useState(false)
"cooldown indicator" -> derived from isThrottled -> use setInterval
"Submitted message" -> lastSubmittedAt -> set once the throttled fn actually runs
"seconds left" -> secondsLeft -> useState(0)
"clicks" -> every click on Submit increments this, whether throttled or not
"apiCalls" -> only increments when the throttle lets the call through
"blocked" -> derived: clicks - apiCalls

USEEFFECT:
 when isThrottled = true, start setInterval, decrement secondsLeft every 1000ms
 when secondsLeft hits 0, clear interval, setIsThrottled(false)
 dependency: [isThrottled]
 cleanup: clearInterval
*/
