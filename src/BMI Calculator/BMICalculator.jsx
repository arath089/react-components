import { useState } from "react";

export default function BMICalculator() {
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");

  const heightInMeters = height / 100;
  const bmi = weight / (heightInMeters * heightInMeters);
  const calculateBMI = Number(bmi.toFixed(1));

  const category =
    calculateBMI < 18.5
      ? "Underweight"
      : calculateBMI < 25
      ? "Normal"
      : calculateBMI < 30
      ? "Overweight"
      : "Obese";

  const categoryColor =
    calculateBMI < 18.5
      ? "text-blue-600"
      : calculateBMI < 25
      ? "text-green-600"
      : calculateBMI < 30
      ? "text-orange-500"
      : "text-red-600";

  return (
    <div className="flex flex-col gap-4">
      <label className="flex flex-col gap-1 text-sm font-medium text-gray-700">
        Height (in cms)
        <input
          value={height}
          onChange={(e) => setHeight(Number(e.target.value))}
          className="rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none"
        />
      </label>
      <label className="flex flex-col gap-1 text-sm font-medium text-gray-700">
        Weight (in kgs)
        <input
          value={weight}
          onChange={(e) => setWeight(Number(e.target.value))}
          className="rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none"
        />
      </label>

      <div className="flex items-center gap-2">
        <h3 className="text-lg font-semibold text-gray-800">Your BMI:</h3>
        {height !== "" && weight !== "" && (
          <h3 className="text-lg font-semibold text-gray-800">{calculateBMI}</h3>
        )}
      </div>
      {height !== "" && weight !== "" && (
        <h3 className={`text-lg font-semibold ${categoryColor}`}>{category}</h3>
      )}
    </div>
  );
}

/*
DECOMPOSITION
- States
  - height - controlled input values
  - weight - controlled input values

- Shapes
  - height - in cms - number
  - weight - in kgs - number
 
- Derived values
  - calculateBMI - rounded to 1 decimal place
  - categorization
  - height - to be calculated in meters not cms

- JSX
  - 2 inputs for height and weight, height in cms and weight in kgs
  - Output BMI category
  - BMI value

 */
