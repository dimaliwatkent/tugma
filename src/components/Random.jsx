import React, { useState, useRef, useEffect } from "react";
import fetchTagalogWordList from "./RhymeGenerator/WordListFetch";

const Random = () => {
  const [randomWord, setRandomWord] = useState("");
  const wordListRef = useRef([]);

  useEffect(() => {
    fetchTagalogWordList().then((wordList) => {
      wordListRef.current = wordList;
    });
  }, []);

  const handleRandomClick = async () => {
    try {
      const randomIndex = Math.floor(
        Math.random() * wordListRef.current.length
      );
      const word = wordListRef.current[randomIndex];
      setRandomWord(word);
    } catch (error) {
      console.error("Error fetching TagalogWords.txt:", error);
    }
  };

  return (
    <div
      className="container mx-auto flex justify-center  min-h-screen"
      onClick={handleRandomClick}
    >
      <h1 className="text-center select-none">
        {randomWord || (
          <p className="text-2xl md:text-5xl">
            Click to Generate a Random Word
          </p>
        )}
      </h1>
    </div>
  );
};

export default Random;
