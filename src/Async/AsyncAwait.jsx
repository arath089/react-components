import { useState, useRef } from "react";

export default function AsyncAwait() {
  const [searchId, setSearchId] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  const abortRef = useRef(null);

  // Metrics
  const [requestCount, setRequestCount] = useState(0);
  const [cancelledCount, setCancelledCount] = useState(0);
  const [lastDuration, setLastDuration] = useState(null);

  const handleSubmit = async () => {
    const url = `https://jsonplaceholder.typicode.com/users/${searchId}`;

    // abortRef persists across clicks so a new submit can cancel the previous in-flight request
    if (abortRef.current) {
      abortRef.current.abort();
      if (isLoading) setCancelledCount((prev) => prev + 1);
    }

    setIsLoading(true);
    setUser(null);
    setError(null);
    setRequestCount((prev) => prev + 1);

    abortRef.current = new AbortController();
    const startedAt = performance.now();

    try {
      const response = await fetch(url, { signal: abortRef.current.signal });
      if (!response.ok) throw new Error("User not found");
      const data = await response.json();
      setUser(data);
      setLastDuration(Math.round(performance.now() - startedAt));
    } catch (error) {
      if (error.name === "AbortError") return;
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="mx-auto flex w-full max-w-md flex-col gap-4">
      <label className="flex flex-col gap-1">
        <span className="text-sm font-medium text-gray-700">
          Search User ID
        </span>
        <input
          value={searchId}
          placeholder="Enter a user ID (1-10)..."
          className="rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-800 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          onChange={(e) => setSearchId(e.target.value)}
        ></input>
      </label>

      <button
        onClick={handleSubmit}
        disabled={!searchId}
        className="rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-gray-300"
      >
        Submit
      </button>

      <div className="grid grid-cols-3 gap-2">
        <div className="flex flex-col items-center gap-1 rounded-md border border-gray-200 bg-white p-3 text-center shadow-sm">
          <span className="text-2xl font-bold text-blue-600">
            {requestCount}
          </span>
          <span className="text-xs font-medium uppercase tracking-wide text-gray-500">
            Requests
          </span>
        </div>
        <div className="flex flex-col items-center gap-1 rounded-md border border-gray-200 bg-white p-3 text-center shadow-sm">
          <span className="text-2xl font-bold text-red-500">
            {cancelledCount}
          </span>
          <span className="text-xs font-medium uppercase tracking-wide text-gray-500">
            Cancelled
          </span>
        </div>
        <div className="flex flex-col items-center gap-1 rounded-md border border-gray-200 bg-white p-3 text-center shadow-sm">
          <span className="text-2xl font-bold text-green-600">
            {lastDuration !== null ? `${lastDuration}ms` : "—"}
          </span>
          <span className="text-xs font-medium uppercase tracking-wide text-gray-500">
            Last Fetch
          </span>
        </div>
      </div>

      {(isLoading || error || user) && (
        <div className="min-h-46.5">
          {isLoading && (
            <div className="flex animate-pulse flex-col gap-3 rounded-md border border-gray-200 bg-gray-50 p-4 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 shrink-0 rounded-full bg-gray-200" />
                <div className="flex flex-col gap-2">
                  <div className="h-3 w-24 rounded bg-gray-200" />
                  <div className="h-2 w-16 rounded bg-gray-200" />
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <div className="h-2 w-full rounded bg-gray-200" />
                <div className="h-2 w-full rounded bg-gray-200" />
                <div className="h-2 w-3/4 rounded bg-gray-200" />
                <div className="h-2 w-2/3 rounded bg-gray-200" />
                <div className="h-2 w-1/2 rounded bg-gray-200" />
              </div>
            </div>
          )}

          {!isLoading && error && (
            <p className="rounded-md border border-red-200 bg-red-50 p-3 text-sm text-red-700">
              Error: {error}
            </p>
          )}

          {!isLoading && user && (
            <div className="flex flex-col gap-3 rounded-md border border-gray-200 bg-gray-50 p-4 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue-600 text-sm font-bold text-white">
                  {user.name.charAt(0)}
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-800">
                    {user.name}
                  </p>
                  <p className="text-xs text-gray-500">@{user.username}</p>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-1 text-xs text-gray-600">
                <p>
                  <span className="font-medium text-gray-700">Email:</span>{" "}
                  {user.email}
                </p>
                <p>
                  <span className="font-medium text-gray-700">Phone:</span>{" "}
                  {user.phone}
                </p>
                <p>
                  <span className="font-medium text-gray-700">Website:</span>{" "}
                  {user.website}
                </p>
                <p>
                  <span className="font-medium text-gray-700">Company:</span>{" "}
                  {user.company?.name}
                </p>
                <p>
                  <span className="font-medium text-gray-700">City:</span>{" "}
                  {user.address?.city}
                </p>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

/*
DECOMPOSITION:
1. What VALUES can CHANGE? Input value, Result, Results loading, request metrics
2. Which changes UPDATE the UI? The query of the id will change the UI
3. What does the USER do? They input the id of the user and click on Submit
4. What does the UI show? Input field, Submit button, results, Loading, Error if failed, metrics

MAPPING:
"input value" -> searchID -> useState("")
"loading" -> isLoading -> useState(false)
"user result" -> user -> useState(null)
"error message" -> error -> useState("")
"click on submit" -> handleSubmit handler
"Results" > {id: number, name: string, email: string } | null
"Error" -> string
"requestCount" -> total submits made
"cancelledCount" -> only increments when a new submit aborts a request still in flight
"lastDuration" -> ms elapsed for the most recently completed fetch

handleSubmit ->
1. What do you set before the fetch starts? set isLoading to true, and clear the previous user and error
2. What does the try block do? It fetches the result for us. sets the user state
3. What does the catch block do? Catch block will catch if there is an error and return the error message
4. Is there anything that should run regardless of success or failure? finally. setIsLoading to false
*/
