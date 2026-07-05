import { useState, useCallback } from "react";

function debounce(fn, delay) {
  let timerId;

  return function (...args) {
    // clear the old timer
    clearTimeout(timerId);
    // start a new countdown timer
    timerId = setTimeout(() => {
      fn(...args); // run our function when countdown completes
    }, delay);
  };
}

export default function DebouncedSearch() {
  const url = "https://jsonplaceholder.typicode.com/users";

  const [search, setSearch] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState([]);

  const noResults = results.length === 0 && search !== "" && !isLoading;

  // Metrics
  const [keyStrokes, setKeyStrokes] = useState(0);
  const [apiCalls, setApiCalls] = useState(0);
  const saved = keyStrokes - apiCalls;

  const debouncedSearch = useCallback(
    debounce(async (search) => {
      setIsLoading(true);
      setApiCalls((prev) => prev + 1);
      const response = await fetch(url);
      const data = await response.json();

      const filtered = data.filter((user) =>
        user.name.toLowerCase().includes(search.toLowerCase())
      );

      setResults(filtered);
      setIsLoading(false);
    }, 500),
    []
  );

  return (
    <div className="mx-auto flex w-full max-w-md flex-col gap-4">
      <label className="flex flex-col gap-1">
        <span className="text-sm font-medium text-gray-700">Search</span>
        <input
          name="search"
          value={search}
          placeholder="Search users..."
          className="rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-800 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          onChange={(e) => {
            const value = e.target.value;
            setSearch(value);

            if (value === "") {
              setApiCalls(0);
              setKeyStrokes(0);
              setResults([]);
            } else {
              debouncedSearch(e.target.value);
              setKeyStrokes((prev) => prev + 1);
            }
          }}
        ></input>
      </label>

      <div className="grid grid-cols-3 gap-2">
        <div className="flex flex-col items-center gap-1 rounded-md border border-gray-200 bg-white p-3 text-center shadow-sm">
          <span className="text-2xl font-bold text-red-500">{keyStrokes}</span>
          <span className="text-xs font-medium uppercase tracking-wide text-gray-500">
            Keystrokes
          </span>
        </div>
        <div className="flex flex-col items-center gap-1 rounded-md border border-gray-200 bg-white p-3 text-center shadow-sm">
          <span className="text-2xl font-bold text-blue-600">{apiCalls}</span>
          <span className="text-xs font-medium uppercase tracking-wide text-gray-500">
            API Calls
          </span>
        </div>
        <div className="flex flex-col items-center gap-1 rounded-md border border-gray-200 bg-white p-3 text-center shadow-sm">
          <span className="text-2xl font-bold text-green-600">{saved}</span>
          <span className="text-xs font-medium uppercase tracking-wide text-gray-500">
            Saved
          </span>
        </div>
      </div>

      {isLoading && <p className="text-sm text-gray-500">Loading...</p>}
      {noResults && (
        <p className="rounded-md border border-gray-200 bg-gray-50 p-4 text-sm text-gray-500">
          No results found
        </p>
      )}

      {results.length > 0 && (
        <ul className="flex flex-col gap-2">
          {results.map((user) => (
            <li
              key={user.id}
              className="rounded-md border border-gray-200 bg-gray-50 p-3"
            >
              <p className="text-sm font-semibold text-gray-800">{user.name}</p>
              <p className="text-xs text-gray-500">{user.email}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

/*
DECOMPOSITION
1. What VALUES can change? The search query can change
2. Which changes UPDATE the UI? The query can update the UI
3. What does the USER do? The user types in the search query in the input field
4. What does the UI show? UI shows the search result after 500ms when user stops typing.

Think about what the USER SEES:

While typing — what shows? While users are typing, nothing shows
While waiting for API response — what shows? Loading state or nothing
After results come back — what shows? The results of the search
If no results — what shows? No results found

MAPPING
"search query" -> string -> useState("")
"loading state" -> isLoading -> useState(false)
"results" -> an array or a string -> useState([])
noResults → derived: results.length === 0 && query !== "" && !isLoading
debouncedSearch → useCallback wrapping debounce → created once on mount
*/
