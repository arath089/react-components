import { useState, useEffect } from "react";

export default function WordleGame() {
  const [guesses, setGuesses] = useState([]);
  const [currentGuess, setCurrentGuess] = useState("");

  const answer = "CRANE";

  const isWon = guesses[guesses.length - 1] === answer;
  const isLost = guesses.length === 6 && !isWon;
  const isGameOver = isWon || isLost;

  useEffect(() => {
    const handleKey = (e) => {
      if (isGameOver) return;
      if (e.key === "Enter") {
        if (currentGuess.length === 5) {
          setGuesses([...guesses, currentGuess]);
          setCurrentGuess("");
        } else {
          alert("Enter 5 letters to submit");
        }
      }

      if (e.key === "Backspace") {
        setCurrentGuess(currentGuess.slice(0, -1));
      }

      if (/^[a-zA-Z]$/.test(e.key) && currentGuess.length < 5) {
        setCurrentGuess(currentGuess + e.key.toUpperCase());
      }
    };

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [guesses, currentGuess]);

  function getTileClasses(guess, colIndex, answer) {
    const letter = guess[colIndex];

    // 1. green:  letter matches answer at THIS position
    if (guess[colIndex] === answer[colIndex])
      return "bg-[#6aaa64] border-[#6aaa64] text-white";
    // 2. yellow: letter is somewhere in answer (but not this position)
    if (answer.includes(letter))
      return "bg-[#c9b458] border-[#c9b458] text-white";
    // 3. gray:   letter not in answer at all
    return "bg-[#787c7e] border-[#787c7e] text-white";
  }

  return (
    <div className="flex flex-col items-center gap-1.5">
      {Array.from({ length: 6 }).map((_, rowIndex) => {
        const rowGuess =
          guesses[rowIndex] ??
          (rowIndex === guesses.length ? currentGuess : "");
        const isSubmitted = rowIndex < guesses.length; // per-row, stays here

        return (
          <div key={rowIndex} className="flex gap-1.5">
            {Array.from({ length: 5 }).map((_, colIndex) => {
              const tileClasses = isSubmitted
                ? getTileClasses(rowGuess, colIndex, answer)
                : rowGuess[colIndex]
                ? "border-gray-500 text-gray-900" // typed, not submitted
                : "border-gray-300"; // empty

              return (
                <div
                  key={colIndex}
                  className={`flex h-11 w-11 items-center justify-center border-2 text-2xl font-bold uppercase transition-colors duration-300 sm:h-13 sm:w-13 ${tileClasses}`}
                >
                  {rowGuess[colIndex]}
                </div>
              );
            })}
          </div>
        );
      })}
      {isWon && (
        <h2 className="mt-3 text-xl font-bold text-[#6aaa64]">You won! 🎉</h2>
      )}
      {isLost && (
        <h2 className="mt-3 text-xl font-bold text-gray-700">
          Game over. The word was{" "}
          <span className="text-[#6aaa64]">{answer}</span>
        </h2>
      )}
      {!isGameOver && (
        <p className="mt-3 text-xs text-gray-400">
          Type letters · Enter to submit · Backspace to delete
        </p>
      )}
    </div>
  );
}
