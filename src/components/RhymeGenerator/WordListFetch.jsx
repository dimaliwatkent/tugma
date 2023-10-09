import { wordlist } from "../../assets/wordlist/TagalogWords";

const fetchTagalogWordList = async () => {
  try {
    // // for fetching .txt file
    // const response = await fetch("src/assets/wordlist/TagalogWords.txt");
    // const data = await response.text();
    // const words = data.split("\n").map((word) => word.replace(/\r/g, ""));

    // importing list
    const words = wordlist;

    return words.filter(Boolean);
  } catch (error) {
    console.error("Error fetching Tagalog word list:", error);
    return [];
  }
};

export default fetchTagalogWordList;
