import { useState } from "react";

const USERS = [
  { id: 1, name: "Archit", role: "Developer" },
  { id: 2, name: "Geeta", role: "Nurse" },
  { id: 3, name: "Kartik", role: "Supply Chain" },
  { id: 4, name: "Papa", role: "Business" },
  { id: 5, name: "Mom", role: "House Wife" },
  { id: 6, name: "Himank", role: "AI Developer" },
];

export default function SearchFilter() {
  const [query, setQuery] = useState("");
  const filteredUsers = USERS.filter((user) =>
    user.name.toLowerCase().includes(query.toLowerCase())
  );
  const resultCount = filteredUsers.length;

  return (
    <div className="w-full max-w-xl rounded-lg bg-white p-6 shadow-md flex flex-col">
      <h3 className="text-xl font-semibold text-gray-800">
        User Search Filter
      </h3>

      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search users..."
        className="mt-4 rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none"
      ></input>

      {query !== "" && (
        <p className="mt-2 text-sm text-gray-500">
          {filteredUsers.length === 0
            ? "No results found"
            : `${resultCount} results`}
        </p>
      )}

      <div className="mt-4 flex flex-col gap-2">
        {(query !== "" ? filteredUsers : USERS).map((user) => (
          <div
            key={user.id}
            className="rounded-md border border-gray-200 px-3 py-2 text-sm text-gray-800"
          >
            {user.name} - {user.role}
          </div>
        ))}
      </div>
    </div>
  );
}

/*
- State
  query — the search input text (string)

- Derived values
  - filteredUsers - filter users by query
  - resultCount - filteredUsers.length

- Operations
  - search - update query on every keystoke (controlled input)

- JSX
  - input bound to query
  - "{resultCount} results"
  - Map over filteredUsers
  - when filteredUsers.length === 0 , "No results found"
*/
