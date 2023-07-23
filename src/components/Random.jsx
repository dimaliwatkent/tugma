import React, { useState } from "react";

const Random = () => {
  const [randomWord, setRandomWord] = useState("");

  const handleRandomClick = async () => {
    try {
      const response = await fetch("src/components/TagalogWords.txt");
      const text = await response.text();
      const words = text.split("\n");
      const randomIndex = Math.floor(Math.random() * words.length);
      const word = words[randomIndex];
      setRandomWord(word);
    } catch (error) {
      console.error("Error fetching TagalogWords.txt:", error);
    }
  };

  return (
    <div
      className=" container mx-auto flex justify-center items-center"
      onClick={handleRandomClick}
    >
      <h1 className="text-center select-none">
        {randomWord || "Click to Generate a Random Word"}
      </h1>
    </div>
  );
};

export default Random;
