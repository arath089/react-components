import { useState } from "react";

export default function ColorPicker() {
  const [r, setR] = useState(0);
  const [g, setG] = useState(0);
  const [b, setB] = useState(0);

  const toHex = (value) => value.toString(16).padStart(2, "0").toUpperCase();

  return (
    <div className="flex flex-col gap-4">
      <label className="flex flex-col gap-1 text-sm font-medium text-gray-700">
        Red: {r}
        <input
          type="range"
          min={0}
          max={255}
          value={r}
          onChange={(e) => setR(Number(e.target.value))}
        />
      </label>
      <label className="flex flex-col gap-1 text-sm font-medium text-gray-700">
        Green: {g}
        <input
          type="range"
          min={0}
          max={255}
          value={g}
          onChange={(e) => setG(Number(e.target.value))}
        />
      </label>
      <label className="flex flex-col gap-1 text-sm font-medium text-gray-700">
        Blue: {b}
        <input
          type="range"
          min={0}
          max={255}
          value={b}
          onChange={(e) => setB(Number(e.target.value))}
        />
      </label>
      <div
        style={{ backgroundColor: `rgb(${r}, ${g}, ${b})` }}
        className="h-24 w-24 rounded-md border border-gray-300 shadow-sm"
      />
      <div className="flex items-center gap-2">
        <h3 className="text-lg font-semibold text-gray-800">RGB Value:</h3>
        <p className="text-sm text-gray-600">
          rgb({r}, {g}, {b})
        </p>
      </div>
      <div className="flex items-center gap-2">
        <h3 className="text-lg font-semibold text-gray-800">Hex Value:</h3>
        <p className="text-sm text-gray-600">
          #{toHex(r)}
          {toHex(g)}
          {toHex(b)}
        </p>
      </div>
      <ul className="list-disc pl-5 text-sm text-gray-600">
        <li>Red : {r}</li>
        <li>Green : {g}</li>
        <li>Blue : {b}</li>
      </ul>
    </div>
  );
}
