import React, { useState, useEffect, useMemo, useRef } from "react";
import RadioButton from "./RadioButton";
import fetchTagalogWordList from "./WordListFetch";

const extractVowels = (word, rhymeType) => {
  const vowels = new Set(["a", "e", "i", "o", "u"]);
  const extractedVowels = [];
  for (let char of word) {
    if (vowels.has(char.toLowerCase())) {
      extractedVowels.push(char.toLowerCase());
    }
  }
  if (
    rhymeType === "multisyllabic" &&
    extractedVowels.length > 0 &&
    !vowels.has(word[word.length - 1].toLowerCase())
  ) {
    extractedVowels.push(word[word.length - 1]);
  }
  return extractedVowels;
};

export const findRhymes = (userInput, rhymeType, wordList) => {
  if (userInput.trim() === "") {
    return [];
  }
  const userVowels = extractVowels(userInput, rhymeType).join("");
  const foundRhymes = wordList.reduce((result, word) => {
    if (rhymeType === "end") {
      if (word.endsWith(userInput.slice(-2))) {
        result.push(word);
      }
    } else {
      const wordVowels = extractVowels(word, rhymeType).join("");
      if (wordVowels.endsWith(userVowels)) {
        if (wordVowels === userVowels) {
          result.unshift(word);
        } else {
          result.push(word);
        }
      }
    }
    return result;
  }, []);
  return foundRhymes;
};

const RhymeGenerator = () => {
  const [userInput, setUserInput] = useState("");
  const [rhymes, setRhymes] = useState([]);
  const [copiedIndex, setCopiedIndex] = useState(-1);
  const [rhymeType, setRhymeType] = useState("multisyllabic");

  const wordListRef = useRef([]);

  useEffect(() => {
    fetchTagalogWordList().then((wordList) => {
      wordListRef.current = wordList;
    });
  }, []);

  useEffect(() => {
    handleFindRhymes(); // Call findRhymes whenever rhymeType changes
  }, [rhymeType]);

  const handleFindRhymes = () => {
    const foundRhymes = findRhymes(userInput, rhymeType, wordListRef.current);
    setRhymes(foundRhymes);
  };

  const copyToClipboard = (index) => {
    navigator.clipboard.writeText(rhymes[index]);
    setCopiedIndex(index);
    setTimeout(() => {
      setCopiedIndex(-1);
    }, 2000);
  };

  return (
    <div className="container mx-auto px-20">
      <div className="relative">
        <input
          type="text"
          value={userInput}
          className="block w-full p-3 pl-4 pr-24 text-lg text-gray-900 border-2  border-color1 rounded-lg bg-color3 focus:border-[#213f57] outline-none placeholder-color4"
          onChange={(e) => setUserInput(e.target.value)}
          placeholder="Enter a word"
          required
        />
        <button
          onClick={handleFindRhymes}
          className="text-color2 absolute right-2.5 bottom-2.5 bg-color1 hover:bg-[#213f57] focus:outline-none font-medium rounded-lg text-sm px-4 py-2"
        >
          RHYME
        </button>
      </div>
      <RadioButton
        onRadioChange={(id) => {
          setRhymeType(id);
        }}
      />

      {rhymes.length > 1 ? (
        <div>
          <h2>Rhyming Words: {rhymes.length}</h2>
          <div className="grid grid-cols-5 gap-4">
            {rhymes.map((rhyme, index) => (
              <div
                key={index}
                className="rhyme-result"
                onClick={() => copyToClipboard(index)}
              >
                <p className="m-2 flex justify-center">{rhyme}</p>
                {copiedIndex === index && (
                  <div className="text-color2 text-xs fixed bottom-0 left-0 right-0 text-center bg-color1">
                    Copied on Clipboard
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      ) : rhymes.length === 1 || rhymes.length === 0 ? (
        <p>No rhyming words found.</p>
      ) : null}
    </div>
  );
};

export default RhymeGenerator;
